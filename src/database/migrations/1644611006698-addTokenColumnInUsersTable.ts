import {MigrationInterface, QueryRunner} from "typeorm";

export class addTokenColumnInUsersTable1644611006698 implements MigrationInterface {
    name = 'addTokenColumnInUsersTable1644611006698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "recPassToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recPassToken"`);
    }

}
