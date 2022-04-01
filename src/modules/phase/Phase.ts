import { Phase } from '../../entity/Phase';

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePhaseInput } from './InputValidation/PhaseInput'
import { User } from '../../entity/User';
import { createQueryBuilder, getRepository } from 'typeorm';


@Resolver(Phase)
export class PhaseResolver {

    
    // get all phases
    @Query(() => [Phase])
    async getAllPhases() {
        try{
            const phase = await createQueryBuilder()
                                .select('phase')
                                .from(Phase, 'phase')
                                // .where('phase.id = :id', {id})
                                .leftJoinAndSelect('phase.tasks', 'tasks')
                                .getMany()
        return phase
        }catch(error){
            throw new Error(error)
        }
         
    }

    // get single phase
    @Query(() => Phase)
    async getSinglePhase(@Arg("id") id: number) {

        try{
            
            const phase = await createQueryBuilder()
                                .select('phase')
                                .from(Phase, 'phase')
                                .where('phase.id = :id', {id})
                                .leftJoinAndSelect('phase.tasks', 'tasks')
                                .getOne()
        return phase
        }catch(error){
            throw new Error(error)
        }

        
    }               

    // Get uncompleted phases
    @Query(()=>[Phase])
    async getUncompletedPhases(){
        const phases = await Phase.find()

        return phases.filter(phase => {
            return phase.isCompleted === false
        })

    }

    // Get completed phases
    @Query(()=>[Phase])
    async getCompletedPhases(){
        const phases = await Phase.find()

        return phases.filter(phase => {
            return phase.isCompleted === true
        })

    }

    // Create phase
    @Mutation(()=>Phase)
    async createPhase(
       @Arg("userId") id: number,
        @Arg("data") {
            title,
            description,
            author
        } : CreatePhaseInput,

        
      
    ){
        

        try{
            const phase = await Phase.create({
            title,
            description,
            author,
            isCompleted: false
          
        }).save()
        const user = await getRepository(User).findOne({where:{id}, relations:['phases']})
        if(!user){
            throw new Error ('User not found')
        }
        user.phases.push(phase)
        await user.save()
        return phase
          
        }catch(error){
            throw new Error(error)
        }

        
    }

    // update phase
    @Mutation(()=>Phase)
    async updatePhase(@Arg("id") id: number, @Arg("data") {
            title,
            description,
            
        }: CreatePhaseInput){

        const phase = await Phase.findOne({where:{id}})
        if (!phase) throw new Error("Phase not found")
        Object.assign(phase, {
            title,
            description,
           
        })
    }

    // delete phase
    @Mutation(()=>Phase)
    async deletePhase(@Arg("id") id:number){
        const phase = await Phase.findOne({where:{id}})

        if (!phase) throw new Error('Phase not found')

        await phase.remove()

        return phase
    }

}
