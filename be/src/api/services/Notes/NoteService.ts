import { Note } from "@base/api/models/Note";
import { NoteRepository } from "@base/api/repositories/NoteRepository";
import { InjectRepository } from "@base/decorators/InjectRepository";
import { AuthCheck } from "@base/infrastructure/middlewares/Auth/AuthCheck";
import { Str } from "@base/utils/helpers/Str";
import { QueryParams, UseBefore } from "routing-controllers";
import { InferCreationAttributes } from "sequelize";
import { Service } from "typedi";

@Service()

export class NoteService {
  constructor(
    @InjectRepository private noteRepository: NoteRepository,
  ) { }

  public async createNote(data: Partial<InferCreationAttributes<Note>>) {
    return await this.noteRepository.createNote({
      ...data,
      slug: Str.slugify(data.title)
    });
  }

  public async getAll(@QueryParams({
    validate:
  }) query: any) {
    return await this.noteRepository.repository.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }


  public async getOne(id: string) {
    return await this.noteRepository.repository.findOne({
      where: {
        id
      }
    });
  }

  public async archive(id: string) {
    const res = await this.noteRepository.repository.update({
      is_archived: '1'
    }, {
      where: {
        id
      }
    });

    return res[0];
  }

  public async unarchive(id: string){
    const res = await this.noteRepository.repository.update({
      is_archived: '0'
    }, {
      where: {
        id
      }
    });

    return res[0];
  }

  public async update(id: string, data: Partial<InferCreationAttributes<Note>>) {
    return await this.noteRepository.repository.update(
      {
        ...data,
        slug: Str.slugify(data.title)
      }
      , {
        where: {
          id
        }
      });
  }

  public async delete(id: string) {
    return await this.noteRepository.repository.destroy({
      where: {
        id
      }
    });
  }

}