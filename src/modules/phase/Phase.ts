import { Phase } from '../../entity/Phase';

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePhaseInput } from './InputValidation/PhaseInput'
import { Task } from '../../entity/Task';


@Resolver(Phase)
export class PhaseResolver {

    
    // get all phases
    @Query(() => [Phase])
    async getAllPhases() {
        return await Phase.find();
    }

    // get single phase
    @Query(() => Phase)
    async getSinglePhase(@Arg("id") id: number) {

        const phase = await Phase.findOne({where:{id}});
        
        if (!phase) throw new Error("Phase not found");
        return phase;
    }

    // create phase
    @Mutation(()=>Phase)
    async createPhase(
        @Arg("data") {
            title,
            description,
            author
        } : CreatePhaseInput,

        
      
    ):Promise<Phase>{
        const phase = await Phase.create({
            title,
            description,
            author,
            isCompleted: false,
        }).save()

        return phase
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

    // complete phase
    @Mutation(()=>Phase)
    async completePhase(@Arg("id") id:number){
        const phase = await Phase.findOne({where:{id}})

        if (!phase) throw new Error('Phase not found')

        phase.isCompleted === true

        await phase.save()

        return phase
    }

    // create new task and add to phase
    @Mutation(()=>Phase)
    async addTaskToPhase(@Arg("id") id: number, @Arg("data") {
        title,
        description,
        author
    }: CreatePhaseInput){
        const phase = await Phase.findOne({where:{id}})
        if (!phase) throw new Error("Phase not found")
        const task = await Task.create({
            title,
            description,
            author,
            isCompleted: false,
        }).save()

        phase.tasks.push(task)

        await phase.save()
        

        return task
    }

    
    


}
