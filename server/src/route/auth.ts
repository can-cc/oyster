import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import { getUserByUsername } from '../dao';

const authRouter = express.Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send();
    }
    const match = bcrypt.compareSync(user.hash, password)
    if (match) {
      return res.status(200).json({
        id: user.id,
        username: user.username
      })
    }
  } catch (error) {
    next(error);
  }

});

export { authRouter };