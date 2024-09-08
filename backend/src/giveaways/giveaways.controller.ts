import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GiveawaysService } from './giveaways.service';
import { CreateGiveawayDto } from './dto/create-giveaway.dto';
import { UpdateGiveawayDto } from './dto/update-giveaway.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('giveaways')
@Controller('giveaways')
export class GiveawaysController {
  constructor(private readonly giveawaysService: GiveawaysService) {}

  @Post()
  create(@Body() createGiveawayDto: CreateGiveawayDto) {
    return this.giveawaysService.create(createGiveawayDto);
  }

  @Get()
  findAll() {
    return this.giveawaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giveawaysService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGiveawayDto: UpdateGiveawayDto,
  ) {
    return this.giveawaysService.update(id, updateGiveawayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giveawaysService.remove(id);
  }
}
