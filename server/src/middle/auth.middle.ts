import { AuthService } from '../service/auth.service';

export function authMiddle(req, res, next) {
  const jwtdata: string = req.header('jwt-token');

  if (!jwtdata) {
    res.status(401).send();
  }

  try {
    AuthService.unsignJwt(jwtdata);
    return next();
  } catch (error) {
    res.status(401).send();
  }
}
