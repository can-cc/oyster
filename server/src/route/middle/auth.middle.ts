import { AuthService } from '../../service/auth.service';

export function authMiddle(req, res, next) {
  const jwtdata: string = req.header('Authorization');

  if (!jwtdata) {
    res.status(401).send();
  }

  try {
    const jwtData = AuthService.unsignJwt(jwtdata);
    req.auth = jwtData.data;
    return next();
  } catch (error) {
    console.error(error); 
    res.status(401).send();
  }
}
