import { Task } from '../../entity/Task';
import {Phase} from '../../entity/Phase'
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTaskInput } from './InputValidation/TaskInput';
import { createQueryBuilder, getRepository } from 'typeorm';



@Resolver(Task)
export class TaskResolver {
    // get all tasks
    @Query(() => [Task])
    async getAllTasks() {
        try{
            const tasks = await createQueryBuilder()
                                .select('task')
                                .from(Task, 'task')
                                // .where('phase.id = :id', {id})
                                .leftJoinAndSelect('task.phase', 'phase')
                                .getMany()
        return tasks
        }catch(error){
            throw new Error(error)
        }
       
    }

    //  function to get a single task
    @Query(() => Task)
    async getTask(@Arg("id") id: number) {
        try{
            const tasks = await createQueryBuilder()
                                .select('task')
                                .from(Task, 'task')
                                .where('task.id = :id', {id})
                                .leftJoinAndSelect('task.phase', 'phase')
                                .getOne()
            
        return tasks
        }catch(error){
            throw new Error(error)
        }
       
    }
        // Get uncompleted Tasks
    @Query(()=>[Task])
    async getUncompletedTasks(){
        const Tasks = await Task.find()

        return Tasks.filter(Task => {
            return Task.isCompleted === false
        })

    }

    // Get completed Tasks
    @Query(()=>[Task])
    async getCompletedTasks(){
        const Tasks = await Task.find()

        return Tasks.filter(Task => {
            return Task.isCompleted === true
        })

    }

    // Create a  create a task
    @Mutation(()=>Task)
    async createTask(
        @Arg("phaseId") id:number,
        @Arg("data") {
            title,
            description,
            author
        } : CreateTaskInput,

        
      
    ){

        try{
         
           const task = await Task.create({
            title,
            description,
            author,
            isCompleted: false
         
        }).save()
        const phase = await getRepository(Phase).findOne({where:{id}, relations:['tasks']})
        if(!phase){
            throw new Error ('User not found')
        }
        phase.tasks.push(task)
        await phase.save()
        return task
                
        
        }catch(error){
            throw new Error(error)
        }
        
    }

    // function to update a task
    @Mutation(()=>Task)
    async updateTask(@Arg("taskId") taskId: number, @Arg("data") {
            title,
            description,
            author
        }: CreateTaskInput){

        const task = await Task.findOne({where:{id:taskId}})
        if (!task) throw new Error("Task not found")
        Object.assign(task, {
            title,
            description,
            author,
        })
        

        return task.save()
    }

    // Complete task
    @Mutation(()=>Task)
    async completeTask(
        @Arg("phaseId") phaseId:number,
        @Arg("id") id:number){
        // const task = await Task.findOne({where:{id}})
        let task = await getRepository(Task).findOne({where:{id: id}})
        if (!task) throw new Error('Task not found')
       
        task.isCompleted = true
        // Object.assign({
        //     isCompleted: true
        // })
        await task.save()

        const phase = await getRepository(Phase).findOne({where:{id: phaseId}, relations:['tasks']})
        if(!phase){
            throw new Error ('Phase not found')
        }
        
        const numberOfUncompletedTasks =  phase.tasks.filter(task=>{
            return task.isCompleted === false
        }).length

        if ( numberOfUncompletedTasks === 0){
            
            phase.isCompleted = true
            await phase.save()
        }
        

        return task
    } 

    @Mutation(()=>Task)
    async deleteTask(@Arg("id") id:number){
        const task = await Task.findOne({where:{id}})

        if (!task) throw new Error('Task not found')

        await task.remove()

        return {
            message: 'Task deleted'
        }
    }

}
