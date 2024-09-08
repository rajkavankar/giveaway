import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDate } from 'class-validator';

export class CreateGiveawayDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsDate()
  expiry: Date;
}
