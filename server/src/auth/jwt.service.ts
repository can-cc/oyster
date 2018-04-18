import * as jwt from 'jsonwebtoken';
import configure from '../configure';

export class AuthService {
  public static signJwt(data: any) {
    return jwt.sign(data, configure.getConfig('SERCERT_KEY'));
  }

  public static unsignJwt(token: string): any {
    return jwt.verify(token, configure.getConfig('SERCERT_KEY'));
  }
}
