import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import "reflect-metadata" // this shim is required
import { Task } from "./Task";

@ObjectType()
@Entity()
export class Phase extends BaseEntity{
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    isCompleted: boolean;

  
    @ManyToOne(()=> User, user => user.phases)
    @JoinColumn({name: "userId"})
    user: User;

    
    @OneToMany(()=> Phase, phase => phase.tasks, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    tasks: Array<Task>;

    

}