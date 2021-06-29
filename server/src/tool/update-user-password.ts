import * as bcrypt from 'bcryptjs';
import { User } from '../entity/app-user';
import { getRepository, createConnection } from 'typeorm';
import { getPostgresConfig } from '../util/db-config';

async function updateUserPassword(username: string, password: string) {
  console.log(`${username}/${password}`);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  await createConnection(getPostgresConfig());

  const user = await getRepository(User).findOne({ username });
  user.hash = hash;
  return getRepository(User)
    .save(user)
    .then(
      () => {
        console.log(`update user ${username} password successful.`);
      },
      (error) => {
        console.error(error);
      }
    );
}

updateUserPassword(process.argv[2], process.argv[3]).then(() => process.exit(0));
