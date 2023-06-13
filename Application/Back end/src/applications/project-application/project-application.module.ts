import { Module } from '@nestjs/common';
import { ProjectApplication } from './project-application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectApplicationService } from './project-application.service';
import { ProjectApplicationController } from './project-application.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectApplication])],
    providers: [ProjectApplicationService],
    controllers: [ProjectApplicationController],
    exports: [ProjectApplicationService]
})
export class ProjectApplicationModule {}
