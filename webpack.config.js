const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
	/* mapped paths to share, e.g., "@shell/utils/*" */
]);

module.exports = {
	output: {
		uniqueName: "sparkAnalytics",
		publicPath: "auto"
	},
	optimization: {
		runtimeChunk: false
	},
	resolve: {
		alias: {
			...sharedMappings.getAliases()
		}
	},
	experiments: {
		outputModule: true
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "spark-analytics",
			filename: "remoteEntry.js",
			library: { type: "module" },
			exposes: {
				"./SharedModule": "./src/app/shared/shared.module.ts"
			},
			shared: share({
				"@angular/core": { singleton: true, strictVersion: true, requiredVersion: "auto" },
				"@angular/common": { singleton: true, strictVersion: true, requiredVersion: "auto" },
				"@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: "auto" },
				"@angular/router": { singleton: true, strictVersion: true, requiredVersion: "auto" },
				...sharedMappings.getDescriptors()
			})
		}),

		sharedMappings.getPlugin()
	]
};
