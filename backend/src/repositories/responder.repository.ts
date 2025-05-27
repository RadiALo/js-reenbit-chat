import { Responder } from '../models/responder.model';

export class ResponderRepository {
  async findAll() {
    return await Responder.find();
  }

  async findById(id: string) {
    return await Responder.findOne({ _id: id });
  }

  async create(data: any) {
    return await Responder.create(data);
  }
}