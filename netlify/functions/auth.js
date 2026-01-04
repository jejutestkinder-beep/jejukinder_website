exports.handler = async (event) => {
	const code = event.queryStringParameters?.code;
	const provider = event.queryStringParameters?.provider;
	const scope = event.queryStringParameters?.scope;

	// code가 없으면 GitHub 인증 페이지로 리다이렉트
	if (!code) {
		const client_id = process.env.GITHUB_CLIENT_ID;
		if (!client_id) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "GITHUB_CLIENT_ID not configured" }),
			};
		}

		const protocol = event.headers['x-forwarded-proto'] || 'https';
		const host = event.headers.host;
		const redirect_uri = `${protocol}://${host}${event.path}`;
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scope || 'repo'}`;

		return {
			statusCode: 302,
			headers: {
				Location: githubAuthUrl,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"Pragma": "no-cache",
				"Expires": "0",
			},
			body: "",
		};
	}

	// code 검증 (보안: 악의적인 입력 방지)
	if (typeof code !== 'string' || code.length > 200 || !/^[a-zA-Z0-9_-]+$/.test(code)) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Invalid code parameter" }),
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
				"User-Agent": "Netlify-CMS-Auth",
			},
			body: JSON.stringify({
				client_id,
				client_secret,
				code,
			}),
		});

		if (!tokenRes.ok) {
			return {
				statusCode: 401,
				body: JSON.stringify({ error: "Failed to exchange code for token" }),
			};
		}

		const data = await tokenRes.json();

		if (!data.access_token) {
			return {
				statusCode: 401,
				body: JSON.stringify({ error: "Failed to get access token" }),
			};
		}

		// 절대 URL로 /admin 리다이렉트 (서버 사이드 리다이렉트)
		const protocol = event.headers['x-forwarded-proto'] || 'https';
		const host = event.headers.host;
		const siteUrl = `${protocol}://${host}`;

		return {
			statusCode: 302,
			headers: {
				Location: `${siteUrl}/admin/#access_token=${data.access_token}&token_type=bearer`,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"Pragma": "no-cache",
				"Expires": "0",
			},
			body: "",
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal server error" }),
		};
	}
};
  