import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Cart from "./Cart";
import Product from "./Product";

@Entity("cartsProducts")
export default class CartProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  productQuantity!: number;

  @ManyToOne(() => Product, (product) => product.cartsProducts, { eager: true })
  product!: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartsProducts)
  cart!: Cart;
}
