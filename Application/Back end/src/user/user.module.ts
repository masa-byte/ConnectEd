import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SubModule } from 'src/subs/subs.module';
import { BookModule } from 'src/book/book.module';
import { PaperModule } from 'src/paper/paper.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        SubModule,
        BookModule,
        PaperModule,
        ProjectModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
