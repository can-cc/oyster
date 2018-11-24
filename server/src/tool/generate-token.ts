import { AuthService } from '../auth/auth.service';

const jwtToken: string = AuthService.signJwt(process.argv[1]);
console.log(jwtToken);
