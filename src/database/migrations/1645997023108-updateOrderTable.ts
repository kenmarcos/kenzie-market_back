import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOrderTable1645997023108 implements MigrationInterface {
    name = 'updateOrderTable1645997023108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_bc93b61ef29a2f47803ce5a7b35"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ordersProductsId"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "isAvailable" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "isAvailable" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ordersProductsId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_bc93b61ef29a2f47803ce5a7b35" FOREIGN KEY ("ordersProductsId") REFERENCES "ordersProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
