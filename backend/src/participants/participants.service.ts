import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prismaService: PrismaService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    try {
      const isInValid = await this.prismaService.giveaway.findFirst({
        where: {
          AND: [
            {
              id: createParticipantDto.giveawayId,
            },
            {
              participants: {
                some: {
                  email: createParticipantDto.email,
                },
              },
            },
          ],
        },
      });

      if (isInValid) {
        throw new HttpException(
          'Email is already registerd',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prismaService.participant.create({
        data: {
          ...createParticipantDto,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prismaService.participant.findMany();
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.participant.findUnique({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    try {
      return await this.prismaService.participant.update({
        where: {
          id,
        },
        data: {
          ...updateParticipantDto,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.participant.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error, { cause: error });
    }
  }
}
