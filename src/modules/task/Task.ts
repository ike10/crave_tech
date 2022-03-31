import { Task } from '../../entity/Task';

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTaskInput } from './InputValidation/TaskInput';


@Resolver(Task)
export class TaskResolver {
    // get all tasks
    @Query(() => [Task])
    async getAllTasks() {
        return await Task.find();
    }

    //  function to get a single task
    @Query(() => Task)
    async getTask(@Arg("id") id: number) {
        const task = await Task.findOne({ where: { id } });
        if (!task) throw new Error("Task not found");
        return task;
    }

    // function to create a task
    @Mutation(()=>Task)
    async createTask(
        @Arg("data") {
            title,
            description,
            author
        } : CreateTaskInput,

        
      
    ):Promise<Task>{
        const task = await Task.create({
            title,
            description,
            author,
            isCompleted: false,
        }).save()

        return task
    }

    // function to delete a task
    @Mutation(()=>Task)
    async updateTask(@Arg("id") id: number, @Arg("data") {
            title,
            description,
            author
        }: CreateTaskInput){

        const task = await Task.findOne({where:{id}})
        if (!task) throw new Error("Task not found")
        Object.assign(task, {
            title,
            description,
            author,
        })
    }

    @Mutation(()=>Task)
    async completeTask(@Arg("id") id:number){
        const task = await Task.findOne({where:{id}})

        if (!task) throw new Error('Task not found')

        task.isCompleted === true

        await task.save()

        return task
    } 

    @Mutation(()=>Task)
    async deleteTask(@Arg("id") id:number){
        const task = await Task.findOne({where:{id}})

        if (!task) throw new Error('Task not found')

        await task.remove()

        return task
    }

}
