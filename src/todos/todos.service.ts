 // src/todos/todos.service.ts
 import { Injectable } from '@nestjs/common';
 import { PrismaService } from '../prisma/prisma.service';
import { Todo } from './todo.interface';
import Decimal from 'decimal.js';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}
 private todos: Todo[] = [
   { "id": 1, "title": "買い物", "completed": false, "price": "19.1234" },
   { "id": 2, "title": "洗濯", "completed": true, "price": "9.04321" }
 ];

 async create(todo: Omit<Todo, 'id'>): Promise<Todo> {
 return this.prisma.todo.create({
   data: {
     title: todo.title,
     completed: todo.completed,
     price: todo.price,
   },
 });
 }

 async findAll(): Promise<Todo[]> {
 const todos = await this.prisma.todo.findMany();
 return todos.map((todo: Todo) => ({
   ...todo,
   price: new Decimal(todo.price).toFixed(2),
 }));
 }

 async findOne(id: number): Promise<Todo | undefined> {
   return this.todos.find((todo) => todo.id === id);
 }

 async update(id: number, update: Partial<Todo>): Promise<Todo | undefined> {
   const todo = await this.findOne(id);
   if (todo) {
     Object.assign(todo, update);
   }
   return todo;
 }

 async remove(id: number): Promise<void> {
 await this.prisma.todo.delete({
   where: { id: id },
 });
 }

 // decimal.jsを使った価格合計計算
 async getTotalPrice(): Promise<Decimal> {
   return this.todos
     .reduce((sum, todo) => sum.plus(new Decimal(todo.price)), new Decimal('0'))
     .toDecimalPlaces(2);
 }
}