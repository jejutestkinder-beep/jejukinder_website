exports.handler = async (event) => {
	// GitHub OAuth code가 없으면 GitHub 인증 페이지로 리다이렉트
	const code = event.queryStringParameters?.code;

	if (!code) {
		const client_id = process.env.GITHUB_CLIENT_ID;
		if (!client_id) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "GITHUB_CLIENT_ID not configured" }),
			};
		}

		const redirect_uri = `${event.headers['x-forwarded-proto'] || 'https'}://${event.headers.host}${event.path}`;
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=repo`;

		return {
			statusCode: 302,
			headers: {
				Location: githubAuthUrl,
				"Cache-Control": "no-cache",
			},
			body: "",
		};
	}

	// code가 있으면 access_token으로 교환
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
		const siteUrl = `https://${event.headers.host}`;

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
  