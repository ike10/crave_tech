import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Phase } from "./Phase";

import "reflect-metadata" // this shim is required
@ObjectType()
@Entity()
export class Task extends BaseEntity{
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
    @Column({ default:false })
    isCompleted: boolean;

    @Column({name : 'phaseId', nullable: true})
    phaseId: number;

   
    @Field(()=>Phase)
    @ManyToOne(()=> Phase, phase => phase.tasks, {cascade: true, eager:true, lazy:true})
    @JoinColumn({name: "phaseId", referencedColumnName: "id"})
    phase: Phase;


}