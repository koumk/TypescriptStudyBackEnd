    // src/todos/todos.controller.ts
  import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
  import { TodosService } from './todos.service';
  import { Todo } from './todo.interface';
  
  @Controller('todos')
  export class TodosController {
    constructor(private readonly todosService: TodosService) {}
  
    @Post()
    async create(@Body() todo: Omit<Todo, 'id'>): Promise<Todo> {
      return this.todosService.create(todo);
    }
  
    @Get()
    async findAll(): Promise<Todo[]> {
      return this.todosService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Todo | undefined> {
      return this.todosService.findOne(parseInt(id, 10));
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() update: Partial<Todo>): Promise<Todo | undefined> {
      return this.todosService.update(parseInt(id, 10), update);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.todosService.remove(parseInt(id, 10));
    }
  
    @Get('total-price')
    async getTotalPrice(): Promise<string> {
      const total = await this.todosService.getTotalPrice();
      return total.toFixed(2);
    }
  }