import configure from '../configure';
import { ConnectionOptions } from 'typeorm';

export function getPostgresConfig(): ConnectionOptions {
  return {
    type: 'postgres',
    host: configure.getConfig('POSTGRES_HOST'),
    username: configure.getConfig('POSTGRES_USERNAME'),
    password: configure.getConfig('POSTGRES_PASSWORD'),
    database: configure.getConfig('POSTGRES_DB'),
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  };
}
