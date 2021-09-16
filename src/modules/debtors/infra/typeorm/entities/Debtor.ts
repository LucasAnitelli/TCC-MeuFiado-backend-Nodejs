import User from "@modules/users/infra/typeorm/entities/User";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  @Entity("debtors")
  class Debtor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    nameDebtor: string;

    @Column()
    date: Date;

    @Column('decimal')
    value: number;

    @Column()
    product: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Debtor;
  