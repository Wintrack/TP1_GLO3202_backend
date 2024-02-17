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
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UpdateBookMarkDto, CreateBookMarkDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags()
@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookMarkService: BookmarkService) {}

  @ApiBearerAuth()
  @Post()
  createBookMark(
    @GetUser('id') user: User,
    @Body() createDto: CreateBookMarkDto,
  ) {
    return this.bookMarkService.createBookmark(user, createDto);
  }

  @ApiBearerAuth()
  @Get()
  getBookMarks(@GetUser('id') user: User) {
    return this.bookMarkService.getBookmarks(user);
  }

  @ApiBearerAuth()
  @Get(':id')
  getBookMarkById(@GetUser('id') user: User, @Param('id') bookMarkId: string) {
    return this.bookMarkService.getBookmarkById(user, bookMarkId);
  }

  @ApiBearerAuth()
  @Put()
  updateBookMarkById(
    @GetUser('id') user: User,
    @Body() updateDto: UpdateBookMarkDto,
  ) {
    return this.bookMarkService.updateBookmark(user, updateDto);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteBookMarkById(
    @GetUser('id') user: User,
    @Param('id') bookMarkId: string,
  ) {
    return this.bookMarkService.deleteBookmarkById(user, bookMarkId);
  }
}
