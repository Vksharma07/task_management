import { IsString, IsOptional, IsArray, ArrayUnique, IsEmail, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsNumber()
  teamId!: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  teamMembers?: number[];
}
