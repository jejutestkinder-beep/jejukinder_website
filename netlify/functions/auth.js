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

	if (!client_id || !client_secret) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "GitHub OAuth credentials not configured" }),
		};
	}

	try {
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
				body: JSON.stringify({ error: "Failed to get access token", details: data }),
			};
		}

		// 절대 URL로 /admin 리다이렉트
		const protocol = event.headers['x-forwarded-proto'] || 'https';
		const host = event.headers.host;
		const siteUrl = `${protocol}://${host}`;

		return {
			statusCode: 302,
			headers: {
				Location: `${siteUrl}/admin/#access_token=${data.access_token}&token_type=bearer`,
				"Cache-Control": "no-cache",
			},
			body: "",
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal server error", message: error.message }),
		};
	}
};
  