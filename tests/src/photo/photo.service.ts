import { Injectable } from '@nestjs/common';

import { InjectCustomRepository } from '../../../lib';
import { Photo } from './photo.entity';
import { CustomPhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    readonly customPhotoRepository: CustomPhotoRepository,
    @InjectCustomRepository(CustomPhotoRepository, 'connection_2')
    readonly customPhotoRepository2: CustomPhotoRepository,
  ) {}

  findAllWithCustomRepo(): Promise<Photo[]> {
    return this.customPhotoRepository.find();
  }

  findAllWithCustomRepo2(): Promise<Photo[]> {
    return this.customPhotoRepository2.find();
  }
}
