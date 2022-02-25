import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Cart from "./Cart";
import OrderProduct from "./OrderProduct";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "float" })
  total!: number;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  cart!: Cart;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToOne(() => OrderProduct, (orderProduct) => orderProduct.order)
  ordersProducts!: OrderProduct[];
}
