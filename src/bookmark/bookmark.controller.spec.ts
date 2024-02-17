// bookmark.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UpdateBookMarkDto, CreateBookMarkDto } from './dto';
import { PrismaModule } from '../prisma/prisma.module';

describe('BookmarkController', () => {
  let bookmarkController: BookmarkController;
  let bookmarkService: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      imports: [PrismaModule],
      providers: [
        BookmarkService,
        {
          provide: JwtGuard,
          useValue: {},
        },
        {
          provide: GetUser,
          useValue: (req: any, property: string) => req[property],
        },
        {
          provide: 'PrismaService',
          useValue: {
            bookmark: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    bookmarkController = module.get<BookmarkController>(BookmarkController);
    bookmarkService = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(bookmarkController).toBeDefined();
  });

  describe('createBookMark', () => {
    it('should call bookmarkService.createBookmark with the correct parameters', async () => {
      const user: User = {
        id: 'user-id',
        createdAt: undefined,
        updatedAt: undefined,
        email: '',
        hash: '',
        firstName: '',
        lastName: '',
      };
      const createDto: CreateBookMarkDto = {
        title: 'New Title',
        description: 'New Description',
        link: '',
      };
      await bookmarkController.createBookMark(user, createDto);
      expect(bookmarkService.createBookmark).toHaveBeenCalledWith(
        user,
        createDto,
      );
    });
  });

  describe('getBookMarks', () => {
    it('should call bookmarkService.getBookmarks with the correct parameters', async () => {
      const user: User = {
        id: 'user-id',
        createdAt: undefined,
        updatedAt: undefined,
        email: '',
        hash: '',
        firstName: '',
        lastName: '',
      };
      await bookmarkController.getBookMarks(user);
      expect(bookmarkService.getBookmarks).toHaveBeenCalledWith(user);
    });
  });

  describe('getBookMarkById', () => {
    it('should call bookmarkService.getBookmarkById with the correct parameters', async () => {
      const user: User = {
        id: 'user-id',
        createdAt: undefined,
        updatedAt: undefined,
        email: '',
        hash: '',
        firstName: '',
        lastName: '',
      };
      const bookMarkId = 'bookmark-id';
      await bookmarkController.getBookMarkById(user, bookMarkId);
      expect(bookmarkService.getBookmarkById).toHaveBeenCalledWith(
        user,
        bookMarkId,
      );
    });
  });

  describe('updateBookMarkById', () => {
    it('should call bookmarkService.updateBookmark with the correct parameters', async () => {
      const user: User = {
        id: 'user-id',
        createdAt: undefined,
        updatedAt: undefined,
        email: '',
        hash: '',
        firstName: '',
        lastName: '',
      };
      const updateDto: UpdateBookMarkDto = {
        id: 'bookmark-id',
        title: 'Updated Title',
        description: 'Updated Description',
      };
      await bookmarkController.updateBookMarkById(user, updateDto);
      expect(bookmarkService.updateBookmark).toHaveBeenCalledWith(
        user,
        updateDto,
      );
    });
  });

  describe('deleteBookMarkById', () => {
    it('should call bookmarkService.deleteBookmarkById with the correct parameters', async () => {
      const user: User = {
        id: 'user-id',
        createdAt: undefined,
        updatedAt: undefined,
        email: '',
        hash: '',
        firstName: '',
        lastName: '',
      };
      const bookMarkId = 'bookmark-id';
      await bookmarkController.deleteBookMarkById(user, bookMarkId);
      expect(bookmarkService.deleteBookmarkById).toHaveBeenCalledWith(
        user,
        bookMarkId,
      );
    });
  });
});
