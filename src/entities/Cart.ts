import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import Order from "./Order";
import CartProduct from "./CartProduct";

@Entity("carts")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  owner!: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartsProducts!: CartProduct[];

  @OneToMany(() => Order, (order) => order.cart)
  orders!: Order[];
}
