import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateBookMarkDto, CreateBookMarkDto } from './dto';

@Injectable({})
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(user: User, createDto: CreateBookMarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: user.id,
        ...createDto,
      },
    });
    return bookmark;
  }
  async updateBookmark(user: User, updateDto: UpdateBookMarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: updateDto.id,
      },
    });

    if (!bookmark || bookmark.userId != user.id) {
      throw new ForbiddenException('Access to ressource denied');
    }

    return await this.prisma.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: {
        ...updateDto,
      },
    });
  }

  async deleteBookmarkById(user: User, bookMarkId: string) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookMarkId,
      },
    });

    if (!bookmark || bookmark.userId != user.id) {
      throw new ForbiddenException('Access to ressource denied');
    }
    await this.prisma.bookmark.delete({
      where: {
        id: bookMarkId,
      },
    });
  }

  async getBookmarks(user: User) {
    const bookmark = await this.prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Ressource not found');
    }
    return bookmark;
  }

  async getBookmarkById(user: User, bookMarkId: string) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookMarkId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Ressource not found');
    }
    return bookmark;
  }
}
