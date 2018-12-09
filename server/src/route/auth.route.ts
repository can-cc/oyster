import * as express from 'express';
import authService, { AuthService } from '../service/auth.service';

const authRouter = express.Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    if (user) {
      const jwtToken = AuthService.signJwt({
        id: user.id,
        username: user.username
      });
      return res
        .header('jwt-header', jwtToken)
        .status(200)
        .json({
          id: user.id,
          username: user.username
        });
    } else {
      return res.status(401).send();
    }
  } catch (error) {
    // TODO 中间件拦截
    console.error(error);
    next(error);
  }
});

export { authRouter };
