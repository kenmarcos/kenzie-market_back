import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1645818263094 implements MigrationInterface {
    name = 'newTables1645818263094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cartsProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productQuantity" integer NOT NULL, "productId" uuid, "cartId" uuid, CONSTRAINT "PK_b802e17e2be2323af8214dd9d25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "brand" character varying NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, "stock" integer NOT NULL, "isAvailable" boolean NOT NULL DEFAULT 'true', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productQuantity" integer NOT NULL, "productId" uuid, "orderId" uuid, CONSTRAINT "PK_07657820faf72f7e62f0b882410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "cartId" uuid, "userId" uuid, "ordersProductsId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "recPassToken" character varying, CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" uuid, CONSTRAINT "REL_b359a87688ab6a2dc25c6f9cd8" UNIQUE ("ownerId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cartsProducts" ADD CONSTRAINT "FK_be8ebb36d53f7b491fee3294505" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartsProducts" ADD CONSTRAINT "FK_80a4d1e6dbca8384297e3242342" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersProducts" ADD CONSTRAINT "FK_c830b9f41ed556f63a30b9a0dcd" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersProducts" ADD CONSTRAINT "FK_b168365accf9e51eaf0a9c0ffda" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_bc93b61ef29a2f47803ce5a7b35" FOREIGN KEY ("ordersProductsId") REFERENCES "ordersProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_b359a87688ab6a2dc25c6f9cd8a" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_b359a87688ab6a2dc25c6f9cd8a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_bc93b61ef29a2f47803ce5a7b35"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`ALTER TABLE "ordersProducts" DROP CONSTRAINT "FK_b168365accf9e51eaf0a9c0ffda"`);
        await queryRunner.query(`ALTER TABLE "ordersProducts" DROP CONSTRAINT "FK_c830b9f41ed556f63a30b9a0dcd"`);
        await queryRunner.query(`ALTER TABLE "cartsProducts" DROP CONSTRAINT "FK_80a4d1e6dbca8384297e3242342"`);
        await queryRunner.query(`ALTER TABLE "cartsProducts" DROP CONSTRAINT "FK_be8ebb36d53f7b491fee3294505"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "ordersProducts"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "cartsProducts"`);
    }

}
