import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { createBookMarkDto } from './dto/createBookMark.dto';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookMarkService: BookmarkService) {}

  @Post('create')
  createBookMark(
    @GetUser('id') user: User,
    @Body() createDto: createBookMarkDto,
  ) {
    return this.bookMarkService.createBookmark(user, createDto);
  }

  @Get()
  getBookMarks(@GetUser('id') userId: string) {
    return this.bookMarkService.getBookmarks(userId);
  }
}
