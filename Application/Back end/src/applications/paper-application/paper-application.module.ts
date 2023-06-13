import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaperApplication } from './paper-application.entity';
import { PaperApplicationService } from './paper-application.service';
import { PaperApplicationController } from './paper-application.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PaperApplication])],
    providers: [PaperApplicationService],
    controllers: [PaperApplicationController],
    exports: [PaperApplicationService]
})
export class PaperApplicationModule {}
