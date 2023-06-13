import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';
import { FacultyMemberModule } from './faculty-member/faculty-member.module';
import { TagModule } from './tag/tag.module';
import { PaperModule } from './paper/paper.module';
import { BookModule } from './book/book.module';
import { ProjectModule } from './project/project.module';
import { TestModule } from './test/test.module';
import { SubModule } from './subs/subs.module';
import { BookApplicationModule } from './applications/book-application/book-application.module';
import { PaperApplicationModule } from './applications/paper-application/paper-application.module';
import { ProjectApplicationModule } from './applications/project-application/project-application.module';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'connecteddb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    SubModule,
    UserModule,
    FacultyModule,
    StudentModule,
    FacultyMemberModule,
    TagModule,
    PaperModule,
    BookModule,
    ProjectModule,
    TestModule,
    BookApplicationModule,
    PaperApplicationModule,
    ProjectApplicationModule,
  ],
  controllers: [AppController, EmailController],
  providers: [AppService, EmailService],
})
export class AppModule {}
