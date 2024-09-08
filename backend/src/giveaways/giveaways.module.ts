import { Module } from '@nestjs/common';
import { GiveawaysService } from './giveaways.service';
import { GiveawaysController } from './giveaways.controller';

@Module({
  controllers: [GiveawaysController],
  providers: [GiveawaysService],
})
export class GiveawaysModule {}
