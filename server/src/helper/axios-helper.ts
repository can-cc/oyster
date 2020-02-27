import configure from '../configure';
import Axios from 'axios';

export function setAxiosGlobalProxy() {
  if (!configure.getConfig('proxy_url')) {
    return;
  }
  Axios.defaults.proxy = parseProxyConfig(configure.getConfig('proxy_url'));
}

export function parseProxyConfig(url: string) {
  let [protocol, hostWithPort] = url.split('://');
  if (!hostWithPort) {
    hostWithPort = protocol;
    protocol = 'http';
  }
  const [host, port] = hostWithPort.split(':');
  return {
    host: host,
    port: parseInt(port, 10),
    protocol: protocol
  };
}
