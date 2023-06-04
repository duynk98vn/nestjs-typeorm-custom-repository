import { Module } from '@nestjs/common';

import { CustomRepositoryModule } from '../../../lib';
import { CustomPhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    CustomRepositoryModule.forFeature([CustomPhotoRepository]),
    CustomRepositoryModule.forFeature([CustomPhotoRepository], 'connection_2'),
  ],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
