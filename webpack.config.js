const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({


  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
	
  },
  sharedMappings: ['lntds-lib'],
});
