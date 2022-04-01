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
    @Column({default:false})
    isCompleted: boolean;


    @Column({name : 'userId', nullable: true})
    userId: number;
  
    @ManyToOne(()=> User, user => user.phases, {eager:true, lazy:true})
    @JoinColumn({name: "userId", referencedColumnName: "id"})
    user: User;

    @Column({name : 'taskId', nullable: true, array:true})
    taskId: number;

    @Field(()=> [Task])
    @JoinColumn({name : 'taskId'})
    @OneToMany(()=> Task, task => task.phase)
    tasks: Task[];

       

}