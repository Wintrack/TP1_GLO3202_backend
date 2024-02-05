import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { updateBookMarkDto, createBookMarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookMarkService: BookmarkService) {}

  @Post()
  createBookMark(
    @GetUser('id') user: User,
    @Body() createDto: createBookMarkDto,
  ) {
    return this.bookMarkService.createBookmark(user, createDto);
  }

  @Get()
  getBookMarks(@GetUser('id') user: User) {
    return this.bookMarkService.getBookmarks(user);
  }

  @Get(':id')
  getBookMarkById(@GetUser('id') user: User, @Param('id') bookMarkId: string) {
    return this.bookMarkService.getBookmarkById(user, bookMarkId);
  }

  @Put()
  updateBookMarkById(
    @GetUser('id') user: User,
    @Body() updateDto: updateBookMarkDto,
  ) {
    return this.bookMarkService.updateBookmark(user, updateDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteBookMarkById(
    @GetUser('id') user: User,
    @Param('id') bookMarkId: string,
  ) {
    return this.bookMarkService.deleteBookmarkById(user, bookMarkId);
  }
}
