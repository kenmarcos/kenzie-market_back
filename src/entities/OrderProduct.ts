import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";
import Order from "./Order";

@Entity("ordersProducts")
export default class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  productQuantity!: number;

  @ManyToOne(() => Product, (product) => product.ordersProducts)
  product!: Product;

  @ManyToOne(() => Order, (order) => order.ordersProducts)
  order!: Order;
}
