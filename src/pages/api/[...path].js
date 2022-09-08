import httpProxy from 'http-proxy';
const API_URL = process.env.API_URL; // The actual URL of your API
const proxy = httpProxy.createProxyServer();
// Make sure that we don't parse JSON bodies on this route:
export const config = {
	api: {
		bodyParser: false,
	},
};
export default (req, res) => {
	console.log(req);
	req.url = req.url.replace('/api', '');
	proxy.web(req, res, {target: API_URL, changeOrigin: true});
	proxy.on('error', function (err) {
		console.log(err);
	});
};
