import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
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

    @Field(()=> [Phase])
    @OneToMany(()=> User, user => user.phases, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    phases: Array<Phase>;


}