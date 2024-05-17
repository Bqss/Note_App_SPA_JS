import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { NoteService } from "../services/Notes/NoteService";
import { Service } from "typedi";
import { Body, Controller, Get, Post, Res, UseBefore } from "routing-controllers";
import { Response } from "express";
import { AuthCheck } from "@base/infrastructure/middlewares/Auth/AuthCheck";
import { StoreNoteRequest } from "../requests/Notes/StoreNoteRequest";

@Service()
@UseBefore(AuthCheck)
@Controller('/notes')
export class NoteController extends ControllerBase {
  constructor(private noteService: NoteService) {
    super();
  }

  @Get('/')
  public async index(@Res() res: Response) {
    const notes = await this.noteService.getAll();
    return res.send({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    })
  }

  @Post('/')
  public async create(@Res() res: Response, @Body() payload: StoreNoteRequest) {
  
      const note = await this.noteService.createNote(payload);
      return res.send({
        success: true,
        message: "Note created successfully",
        data: note,
      })
    
  }
}