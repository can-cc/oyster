import axios from 'axios';

// 1. https://www.google.com/s2/favicons?domain=
// 2. favicongrabber.com


export class FaviconGrabberService {
    
getFavicon(domain: string) {
    return axios
      .get(`https://www.google.com/s2/favicons?domain=${domain}`, {
        responseType: 'arraybuffer',
        timeout: 3000
      })
      .then(r => r.data);
  }
}

export default new FaviconGrabberService();
