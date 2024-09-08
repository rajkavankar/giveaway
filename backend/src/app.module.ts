import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GiveawaysModule } from './giveaways/giveaways.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, GiveawaysModule, ParticipantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
