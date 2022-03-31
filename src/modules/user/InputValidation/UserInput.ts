import { Length } from "class-validator";
import { Field, InputType, InputType } from "type-graphql";

// validations for the phase input
@InputType()
export class RegisterUserInput {
    @Field()
    @Length(1, 30)
    username: string;

}

@InputType()
export class UpdateUserInput{
    @Field({nullable: true})
    @Length(1, 30)
    username: string;

}
