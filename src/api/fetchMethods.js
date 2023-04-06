export const APISettings = {
	headers: new Headers({
		Accept: '*/*',
		'Content-Type': 'application/json',
		api_key: process.env.VUE_APP_CS_API_KEY,
		access_token: process.env.VUE_APP_CS_TOKEN,
		'Access-Control-Allow-Origin': '*',
	}),
	baseURL: `https://cdn.contentstack.io/v3/content_types/`,
};

export default {
	getCSData(url) {
		return fetch(APISettings.baseURL + url, {
			method: 'GET',
			headers: APISettings.headers,
		}).then(function (response) {
			if (response.status != 200) {
				throw response.status;
			} else {
				return response.json();
			}
		});
	},
};
