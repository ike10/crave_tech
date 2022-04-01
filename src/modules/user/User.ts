

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createQueryBuilder } from "typeorm";
// import { CreatePhaseInput } from './create/CreateInput';
import { User } from '../../entity/User';
import { RegisterUserInput, UpdateUserInput } from './InputValidation/UserInput';


@Resolver(User)
export class UserResolver {

    // Get all users
    @Query(() => [User])
    async getUsers() {
        try{
            const user = await createQueryBuilder()
                                .select('user')
                                .from(User, 'user')
                                // .where('phase.id = :id', {id})
                                .leftJoinAndSelect('user.phases', 'phases')
                                .leftJoinAndSelect('phases.tasks', 'tasks')
                                .getMany()
        return user
        }catch(error){
            throw new Error(error)
        }
    }
    // Get a single user by Id
    @Query(() => User)
    async getSingleUser(
        @Arg("id") id: number
    ){
        try{
            const user = await createQueryBuilder()
                                .select('user')
                                .from(User, 'user')
                                .where('user.id = :id', {id: id})
                                .leftJoinAndSelect('user.phases', 'phases')
                                .leftJoinAndSelect('phases.tasks', 'tasks')
                                .getOne()
        return user
        }catch(error){
            throw new Error(error)
        }
    }


    // Mutation to register a startup/user
    @Mutation(()=>User)
    async registerUser(
        @Arg("data") {
            username,
        
        } : RegisterUserInput,

        
      
    ):Promise<User>{
        const user = await User.create({
            username: username,
            phases: [],
            
        }).save()

        return user
    }

    // create mutation to update user
    @Mutation(()=>User)
    async updateUser(@Arg("id") id: number, @Arg("data") {
            username,
    }: UpdateUserInput){

        const user = await User.findOne({where:{id}})
        if (!user) throw new Error("User not found")
        Object.assign(user, {
            username,
        })

        return user.save()
        
    }

    // create mutation to delete user
    @Mutation(()=>User)
    async deleteUser(@Arg("id") id: number){
        const user = await User.findOne({where:{id}})
        if (!user) throw new Error("User not found")
        await User.remove(user)

        return 'User deleted'
    }

    

}

