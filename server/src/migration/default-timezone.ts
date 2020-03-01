import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultTimeZone1583072848326 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    console.log('[database migration] set database default timezone utc');
    await queryRunner.query(`ALTER DATABASE postgres SET timezone TO 'UTC';`);
  }

  async down(queryRunner: QueryRunner): Promise<any> {}
}
