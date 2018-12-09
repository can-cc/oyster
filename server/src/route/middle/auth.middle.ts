import { AuthService } from '../../service/auth.service';

export function authMiddle(req, res, next) {
  const jwtdata: string = req.header('jwt-token');

  if (!jwtdata) {
    res.status(401).send();
  }

  try {
    const x = AuthService.unsignJwt(jwtdata);
    console.log('xxxxxxxx', x);
    return next();
  } catch (error) {
    console.error(error); 
    res.status(401).send();
  }
}
