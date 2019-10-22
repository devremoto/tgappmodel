const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ApiName: GetEnvVar('AppModelConfiguration:ApiName'),
        ImgFolder: GetEnvVar('AppModelConfiguration:ImgFolder'),
        Authority: GetEnvVar('AppModelConfiguration:Authority'),
        UseAuthority: GetEnvVar('AppModelConfiguration:UseAuthority', true),
        RequireHttpsMetadata: GetEnvVar('AppModelConfiguration:RequireHttpsMetadata', true),
        HostServer: GetEnvVar('AppModelConfiguration:HostServer'),
        HostPort: GetEnvVar('AppModelConfiguration:HostPort'),
        ApiUrl: GetEnvVar('AppModelConfiguration:ApiUrl'),
        MapKey: GetEnvVar('AppModelConfiguration:MapKey'),
        ClientId: GetEnvVar('AppModelConfiguration:ClientId'),
      }
    })
  ]
};

function GetEnvVar(key, isBool) {
  var envVar = process.env[key] || process.env[key.replace(':', '_')];
  console.log(`${key}:${envVar}`);
  if (envVar) {
    if (isBool) {
      return JSON.parse(envVar);
    }
    return JSON.stringify(envVar);
  }
  return '';
}
