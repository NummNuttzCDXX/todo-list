const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{  // This lets me add images using 'url-loader' package
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				use: {
					loader: 'url-loader',
				},
			},
		],
	},
};