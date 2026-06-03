// JSUCSA Decap CMS OAuth Gateway
// 部署到 Cloudflare Workers（免费）
//
// 环境变量（在 Cloudflare Dashboard 设置）：
//   GITHUB_CLIENT_ID     - GitHub OAuth App 的 Client ID
//   GITHUB_CLIENT_SECRET - GitHub OAuth App 的 Client Secret
//   ALLOWED_USERS        - 允许的 GitHub 用户名，逗号分隔，如 "user1,user2,user3"

const ALLOWED_USERS = (env.ALLOWED_USERS || '').split(',').map(u => u.trim().toLowerCase());

function isAllowed(username) {
  return ALLOWED_USERS.includes(username.toLowerCase());
}

function html(body, status = 200) {
  return new Response(`<!DOCTYPE html><html><body>${body}</body></html>`, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') || 'github';
  const redirectUri = `${url.origin}/callback`;
  const state = crypto.randomUUID();

  // 存储 state（简单方式：放在 cookie 里，实际可用 KV）
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user&state=${state}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl,
      'Set-Cookie`: `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return json({ error: 'Missing code' }, 400);
  }

  // 用 code 换 token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return json({ error: tokenData.error_description || tokenData.error }, 403);
  }

  const token = tokenData.access_token;

  // 获取用户信息
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'JSUCSA-CMS',
    },
  });

  const user = await userRes.json();
  const username = user.login;

  // 检查权限
  if (!isAllowed(username)) {
    return html(`
      <h2>⛔ 访问被拒绝</h2>
      <p>GitHub 账号 <strong>${username}</strong> 没有编辑权限。</p>
      <p>请联系管理员添加你的账号到白名单。</p>
      <p><a href="/admin/">返回</a></p>
    `, 403);
  }

  // 登录成功，返回 token 给 CMS
  return html(`
    <script>
      (function() {
        function sendMessage(provider, token, username) {
          var msg = {
            provider: provider,
            token: token,
          };
          if (username) {
            msg.username = username;
          }
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify(msg),
            document.location.origin
          );
          window.close();
        }
        sendMessage("github", "${token}", "${username}");
      })();
    </script>
    <p>✅ 登录成功，正在关闭窗口...</p>
  `);
}

async function handleApiAuth(request, env) {
  // Decap CMS 的 token 交换请求
  if (request.method === 'GET') {
    // 重定向到 GitHub OAuth
    return handleAuth(request, env);
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return json({ error: 'Missing code' }, 400);
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return json({ error: tokenData.error_description || tokenData.error }, 403);
    }

    // 验证用户权限
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${tokenData.access_token}`,
        'User-Agent': 'JSUCSA-CMS',
      },
    });

    const user = await userRes.json();

    if (!isAllowed(user.login)) {
      return json({ error: 'Unauthorized user' }, 403);
    }

    return json({ token: tokenData.access_token, provider: 'github' });
  }

  return json({ error: 'Method not allowed' }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 路由
    if (path === '/auth' || path === '/api/v1/auth') {
      return handleAuth(request, env);
    }

    if (path === '/callback') {
      return handleCallback(request, env);
    }

    if (path === '/api/auth') {
      return handleApiAuth(request, env);
    }

    return html('<h2>JSUCSA CMS Auth Gateway</h2><p>This service handles OAuth for the blog CMS.</p>');
  },
};
