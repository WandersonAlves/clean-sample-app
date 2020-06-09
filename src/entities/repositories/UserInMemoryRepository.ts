import { DataRepository } from '../interfaces';
import { injectable } from 'inversify';
import { IUserDTO } from '../dtos/IUserDTO';
import { TRestParameters } from '../../shared/types';
import GenericException from '../../shared/exceptions/GenericException';

@injectable()
export default class UserInMemoryRepository implements DataRepository<IUserDTO> {
  private users: IUserDTO[] = [
    {
      email: 'admin@admin.com',
      name: 'Wanderson',
      id: 1,
      // 1234 password
      passwordHash: '$2y$10$7fN/nIXgqKoOv8cZBz.5SOzXA6.KQmX/vXhINxYsVJiBZ5cfpMFmW',
    },
    {
      email: 'foo@bar.com',
      name: 'Foo Bar',
      id: 2,
      // 1234 password
      passwordHash: '$2y$10$7fN/nIXgqKoOv8cZBz.5SOzXA6.KQmX/vXhINxYsVJiBZ5cfpMFmW',
    },
  ];

  find(filter?: TRestParameters<IUserDTO>): Promise<IUserDTO[]> {
    const result = this.users.filter(u => this._match(u, filter));
    return Promise.resolve(result);
  }
  findOne(filter?: TRestParameters<IUserDTO>): Promise<IUserDTO> {
    const result = this.users.find(u => this._match(u, filter));
    return Promise.resolve(result);
  }
  create(obj: IUserDTO): Promise<IUserDTO> {
    console.log(obj.email);
    if (this.users.find(u => u.email === obj.email)) {
      return null;
    }
    this.users.push(obj);
    return Promise.resolve(obj);
  }
  updateById(id: string | number, obj: Partial<IUserDTO>): Promise<IUserDTO> {
    this.users[id] = { ...this.users[id], ...obj };
    return this.users[id];
  }

  private _match(u: IUserDTO, filter: TRestParameters<IUserDTO>) {
    let hasMatch = true;
    Object.entries(filter).map(k => {
      if (hasMatch) {
        const entry = k[0];
        const value = k[1];
        hasMatch = u[entry] === value ? true : false;
      }
    });
    return hasMatch;
  }
}
