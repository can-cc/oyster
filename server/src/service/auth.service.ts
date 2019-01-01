import * as jwt from 'jsonwebtoken';
import configure from '../configure';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcryptjs';

export class AuthService {
  public static signJwt(data: any) {
    return jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + configure.getConfig('JWT_EXP')
      },
      configure.getConfig('SERCERT_KEY')
    );
  }

  public static unsignJwt(token: string): any {
    return jwt.verify(token, configure.getConfig('SERCERT_KEY'));
  }

  public async findUser(useId: number): Promise<User> {
    return await getRepository(User).findOne({ id: useId });
  }

  public async login(username: string, password: string): Promise<User | null> {
    const user: User = await getRepository(User).findOne({ username });
    if (!user) {
      return null;
    }
    const match = bcrypt.compareSync(password, user.hash);
    if (match) {
      return user;
    }
    return user;
  }
}

export default new AuthService();
