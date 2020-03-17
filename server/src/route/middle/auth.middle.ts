import { AuthService } from '../../service/auth.service';
import { logger } from '../../logger';

export function authMiddle(req, res, next) {
  const jwtdata: string = req.header('Authorization');

  if (!jwtdata) {
    res.status(401).send();
  }

  try {
    const jwtData = AuthService.unSignJwt(jwtdata);
    req.auth = jwtData.data;
    return next();
  } catch (error) {
    logger.error(error);
    res.status(401).send();
  }
}
