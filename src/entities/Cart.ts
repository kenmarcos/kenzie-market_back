import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity("carts")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user!: User;

  @ManyToMany(() => Product, {
    eager: true,
  })
  @JoinTable()
  products!: Product[];
}
