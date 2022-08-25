import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(input: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }
}
