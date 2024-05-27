import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { NoteService } from "../services/Notes/NoteService";
import { Service } from "typedi";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseBefore } from "routing-controllers";
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

  @Get('/:id')
  public async show(@Res() res: Response, @Param('id') id: string) {
    const note = await this.noteService.getOne(id);
    return res.send({
      success: true,
      message: "Note fetched successfully",
      data: note,
    })
  }

  @Put('/:id')
  public async update(@Body() payload: StoreNoteRequest, @Param("id") id: string, @Res() res: Response) {
    const affectedRows = await this.noteService.update(id, payload);
    if (affectedRows[0] === 0) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      })
    } else {
      return res.send({
        success: true,
        message: "Note updated successfully",
      })
    }
  }

  @Delete('/:id')
  public async delete(@Res() res: Response, @Param("id") id: string) {
    const affectedRows = await this.noteService.delete(id);
    if(affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      })
    }else{
      return res.send({
        success: true,
        message: "Note deleted successfully",
      })
    }
  }

  @Patch('/:id/archive')
  public async archive(@Res() res: Response, @Param("id") id: string) {
    const affectedRows = await this.noteService.archive(id);
    if(affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      })
    }else{
      return res.send({
        success: true,
        message: "Note archived successfully",
      })
    }
  }

  @Patch('/:id/unarchive')
  public async unarchive(@Res() res: Response, @Param("id") id: string) {
    const affectedRows = await this.noteService.unarchive(id);
    if(affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      })
    }else{
      return res.send({
        success: true,
        message: "Note unarchived successfully",
      })
    }
  }
}