import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';
import { getRepository, createConnection } from 'typeorm';


async function createUser(username: string, password: string) {
  console.log(`${username}/${password}`);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  await createConnection();
  const user = new User({ username, hash });
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return getRepository(User).save(user).then(() => {
    console.log(`create user ${username}/${password} successful.`)
  }, (error) => {
    console.error(error)
  });
}

createUser(process.argv[2], process.argv[3]).then(() => process.exit(0));