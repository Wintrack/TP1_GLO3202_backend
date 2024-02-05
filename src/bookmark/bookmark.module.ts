import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [BookmarkController],
  providers: [BookmarkService, JwtStrategy],
})
export class BookmarkModule {}
