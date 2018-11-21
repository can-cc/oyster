import * as bcrypt from 'bcryptjs';
import { saveUser } from '../dao';

function createUser(username: string, password: string) {
  console.log(`${username}/${password}`);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return saveUser(username, hash).then(() => {
    console.log(`create user ${username}/${password} successful.`)
  }, (error) => {
    console.error(error)
  });
}

createUser(process.argv[2], process.argv[3]).then(() => process.exit(0));