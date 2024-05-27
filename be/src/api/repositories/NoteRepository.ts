import { RepositoryBase } from "@base/infrastructure/abstracts/RepositoryBase";
import { Note } from "../models/Note";
import { CreationAttributes } from "sequelize";
import { Service } from "typedi";
import { randomUUID } from "crypto";

@Service()
export class NoteRepository extends RepositoryBase<Note> {
  constructor() {
    super(Note);
  }

  public async createNote(payload : Omit<CreationAttributes<Note>,'id'>) {
    return this.repository.create({
      "id" : randomUUID(),
      ...payload,
    });
  }
}