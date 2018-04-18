import { AuthService } from '../auth/jwt.service';

const jwtToken: string = AuthService.signJwt(process.argv[1]);
console.log(jwtToken);
