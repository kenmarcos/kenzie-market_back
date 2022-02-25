import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import CartProduct from "./CartProduct";
import OrderProduct from "./OrderProduct";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column({ type: "float" })
  price!: number;

  @Column()
  description!: string;

  @Column({ type: "int" })
  stock!: number;

  @Column({ default: "true" })
  isAvailable!: boolean;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartsProducts!: CartProduct[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  ordersProducts!: OrderProduct[];
}
