import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;
}
