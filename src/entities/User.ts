import bcrypt from "bcrypt";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from "typeorm";
import Cart from "./Cart";
import Order from "./Order";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @Column({ default: false })
  isAdm!: boolean;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true, select: false })
  recPassToken!: string;

  @OneToOne(() => Cart, (cart) => cart.owner)
  cart!: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
