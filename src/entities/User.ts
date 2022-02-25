import bcrypt from "bcrypt";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
} from "typeorm";
import Cart from "./Cart";

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

  @Column()
  isAdm!: boolean;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  recPassToken!: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart!: Cart;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
