import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1645819197441 implements MigrationInterface {
    name = 'updateUser1645819197441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "isAvailable" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "isAvailable" SET DEFAULT true`);
    }

}
