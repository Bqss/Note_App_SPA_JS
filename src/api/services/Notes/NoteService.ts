import { NoteRepository } from "@base/api/repositories/NoteRepository";
import { InjectRepository } from "@base/decorators/InjectRepository";
import { AuthCheck } from "@base/infrastructure/middlewares/Auth/AuthCheck";
import { UseBefore } from "routing-controllers";
import { Service } from "typedi";

@Service()

export class NoteService {
  constructor(
    @InjectRepository private noteRepository: NoteRepository,
  ){}

  public async createNote (data: object) {
    return await this.noteRepository.createNote(data);
  }

  public async getAll() {
    return await this.noteRepository.repository.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
  
}