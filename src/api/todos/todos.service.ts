import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../common/schema/user.schema';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../../common/schema/todo.schema';
import { TodoDto, TodoUpdateDto } from './todo.dto';
import { IResponseOk } from '../../common/interface/common.interface';
import { ITodoCheckWeekend } from './todos.interfaces';
import moment from 'moment';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create({
    user,
    name,
    description,
    endDate,
  }: TodoDto & { user: UserDocument }): Promise<IResponseOk> {
    await this.todoModel.create({
      name,
      description,
      endDate,
      userId: user._id,
    });
    return {
      ok: 'Todo has successfully created',
    };
  }

  async update({
    name,
    description,
    endDate,
    id,
    done = false,
  }: TodoUpdateDto & { id: string }): Promise<IResponseOk> {
    // Check if todo exist
    const findTodo = await this.todoModel.findOne({
      _id: id,
    });
    if (!findTodo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    await this.todoModel.updateOne(
      {
        _id: id,
      },
      {
        name,
        description,
        endDate,
        done,
      },
    );
    return {
      ok: 'Todo has successfully updated',
    };
  }

  async getAll(): Promise<TodoDocument[]> {
    return this.todoModel.find();
  }

  async get({ id }: { id: string }): Promise<TodoDocument> {
    // Check if todo is existed
    const getTodo = await this.todoModel.findById(id);
    if (!getTodo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    return getTodo;
  }

  async delete({ id }: { id: string }): Promise<IResponseOk> {
    // Check if todo exist
    const findTodo = await this.todoModel.findOne({
      _id: id,
    });
    if (!findTodo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    await this.todoModel.deleteOne({
      _id: id,
    });
    return {
      ok: 'Todo has successfully deleted',
    };
  }

  async checkWeekend({ id }: { id: string }): Promise<ITodoCheckWeekend> {
    const getTodo = await this.todoModel.findById(id);
    if (!getTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    // Get day of week
    const dayOfWeek = moment(getTodo.endDate).weekday();
    return {
      isWeekend: dayOfWeek > 5,
    };
  }
}
