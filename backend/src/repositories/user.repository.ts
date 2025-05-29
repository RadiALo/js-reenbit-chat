import { User } from '../models/user.model';

export class UserRepository {
  async findAll() {
    return await User.find();
  }

  async findById(id: string) {
    return await User.findOne({ _id: id });
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async create(data: any) {
    return await User.create(data);
  }
}
