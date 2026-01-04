exports.handler = async (event) => {
    const code = event.queryStringParameters?.code;
  
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing code parameter" }),
      };
    }
  
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
  
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });
  
    const data = await tokenRes.json();
  
    if (!data.access_token) {
      return {
        statusCode: 401,
        body: JSON.stringify(data),
      };
    }
  
    // 🔑 절대 URL로 /admin 리다이렉트
    const siteUrl = "https://chipper-lebkuchen-cc3872.netlify.app";
  
    return {
      statusCode: 302,
      headers: {
        Location: `${siteUrl}/admin/#access_token=${data.access_token}&token_type=bearer`,
        "Cache-Control": "no-cache",
      },
      body: "",
    };
  };
  