import { Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

// validations for the phase input
@InputType()
export class CreatePhaseInput {
    @Field()
    @Length(1, 30)
    title: string;

    @Field({ nullable: true })
    @Length(1, 255)
    description: string;

    @Field()
    @MaxLength(30)
    author: string;

}

@InputType()
export class UpdatePhaseInput {
    @Field({ nullable: true })
    @Length(1, 30)
    title: string;

    @Field({ nullable: true })
    @Length(1, 255)
    description: string;

}
