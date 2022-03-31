

import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import { CreatePhaseInput } from './create/CreateInput';
import { User } from '../../entity/User';
import { RegisterUserInput, UpdateUserInput } from './InputValidation/UserInput';


@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async getUsers() {
        return User.find()
    }

    @Query(() => User)
    async getSingleUser(
        @Arg("id") id: number
    ){
        return User.findOne({where : {id}})
    }


    @Mutation(()=>User)
    async registerUser(
        @Arg("data") {
            username,
            
        } : RegisterUserInput,

        
      
    ):Promise<User>{
        const user = await User.create({
            username
        }).save()

        return user
    }

    // create mutation to update user with phase
    @Mutation(()=>User)
    async updateUser(@Arg("id") id: number, @Arg("data") {
            username,
    }: UpdateUserInput){

        const user = await User.findOne({where:{id}})
        if (!user) throw new Error("User not found")
        Object.assign(user, {
            username,
        })
        
    }

    // create mutation ton delete user
    @Mutation(()=>User)
    async deleteUser(@Arg("id") id: number){
        const user = await User.findOne({where:{id}})
        if (!user) throw new Error("User not found")
        await User.remove(user)
    }

    

}
