import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGiveawayDto } from './dto/create-giveaway.dto';
import { UpdateGiveawayDto } from './dto/update-giveaway.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GiveawaysService {
  constructor(private prismaService: PrismaService) {}
  async create(createGiveawayDto: CreateGiveawayDto) {
    try {
      return this.prismaService.giveaway.create({
        data: { ...createGiveawayDto },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prismaService.giveaway.findMany({
        include: {
          participants: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.giveaway.findUnique({
        where: {
          id,
        },
        include: {
          participants: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async update(id: string, updateGiveawayDto: UpdateGiveawayDto) {
    try {
      return await this.prismaService.giveaway.update({
        where: {
          id,
        },
        data: {
          ...updateGiveawayDto,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.giveaway.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }
}
