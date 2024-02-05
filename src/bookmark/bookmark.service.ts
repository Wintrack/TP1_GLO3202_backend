import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBookMarkDto } from './dto/createBookMark.dto';
import { User } from '@prisma/client';

@Injectable({})
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(user: User, createDto: createBookMarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: user.id,
        ...createDto,
      },
    });
    return bookmark;
  }
  async updateBookmark(user: User) {}
  async deleteBookmarkById(user: User) {}
  async getBookmarks(user: User) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
    });
  }
  async getBookmarkById(user: User) {}
}
