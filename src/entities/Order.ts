import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Cart from "./Cart";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  value!: number;

  @ManyToOne(() => Cart)
  cart!: Cart;
}
