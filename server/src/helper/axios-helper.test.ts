import { parseProxyConfig } from './axios-helper';

test('test generateProxyConfig', () => {
  const proxyConfig1 = parseProxyConfig('192.168.1.1:5432');
  expect(proxyConfig1.host).toEqual('192.168.1.1');
  expect(proxyConfig1.port).toEqual(5432);

  const proxyConfig2 = parseProxyConfig('localhost:5432');
  expect(proxyConfig2.host).toEqual('localhost');
  expect(proxyConfig2.port).toEqual(5432);

  const proxyConfig3 = parseProxyConfig('https://192.168.1.1:5432');
  expect(proxyConfig3.host).toEqual('192.168.1.1');
  expect(proxyConfig3.port).toEqual(5432);
  expect(proxyConfig3.protocol).toEqual('https');
});
