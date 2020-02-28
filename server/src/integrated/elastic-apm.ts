import configure from '../configure';

export function startApmIfConfigured() {
  if (!configure.getConfig('apm_service_name')) {
    return null;
  }
  var apm = require('elastic-apm-node').start({
    serviceName: configure.getConfig('apm_service_name'),
    secretToken: configure.getConfig('apm_secret_token'),
    serverUrl: configure.getConfig('apm_server_url')
  });
  return apm;
}
