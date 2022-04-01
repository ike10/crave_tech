import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { Phase } from "./Phase";
import "reflect-metadata" // this shim is required

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    username: string;

   
    @Column({name : 'phaseId', nullable: true, array:true})
    phaseId: number;

    @Field(()=> [Phase])
    @JoinColumn({name : 'phaseId'})
    @OneToMany(()=> Phase, phase => phase.user, {cascade: true})
    phases: Phase[];


}