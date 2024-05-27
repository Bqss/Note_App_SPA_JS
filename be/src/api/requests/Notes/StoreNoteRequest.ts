import { isUnique } from "@base/decorators/validation-rules/IsUnique";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class StoreNoteRequest {
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(5)
  @IsString()
  @isUnique('notes','title')
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}