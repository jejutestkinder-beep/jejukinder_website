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
  
    const res = await fetch("https://github.com/login/oauth/access_token", {
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
  
    const data = await res.json();
  
    if (!data.access_token) {
      return {
        statusCode: 401,
        body: JSON.stringify(data),
      };
    }
  
    return {
      statusCode: 302,
      headers: {
        Location: `/admin/#access_token=${data.access_token}&token_type=bearer`,
        "Cache-Control": "no-cache",
      },
      body: "",
    };
  };
  