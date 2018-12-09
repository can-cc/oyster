import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import { getUserByUsername } from '../dao';
import authService, { AuthService } from '../service/auth.service';
import {getRepository} from "typeorm";


const authRouter = express.Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await getUserByUsername(username);
    if (!users[0]) {
      return res.status(401).send();
    }
    const user = users[0];
    const match = bcrypt.compareSync(password, user.hash);
    
    if (match) {
      const jwtToken = AuthService.signJwt(user);
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
