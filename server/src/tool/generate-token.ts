import { AuthService } from '../service/auth.service';

const jwtToken: string = AuthService.signJwt(process.argv[1]);
console.log(jwtToken);
