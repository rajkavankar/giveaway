import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  giveawayId: string;
}
