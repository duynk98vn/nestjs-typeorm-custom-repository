import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { AppModule } from './src/app.module';
import { PhotoService } from './src/photo/photo.service';

describe('CustomRepositoryModule', () => {
  let photoService: PhotoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    photoService = module.get<PhotoService>(PhotoService);
  });

  it('Inject default connect', async () => {
    expect(photoService.customPhotoRepository).toBeInstanceOf(Repository);
    expect(await photoService.findAllWithCustomRepo()).toEqual(expect.arrayContaining([]));
  });

  it('Inject specific connection', async () => {
    expect(photoService.customPhotoRepository2).toBeInstanceOf(Repository);
    expect(await photoService.findAllWithCustomRepo2()).toEqual(expect.arrayContaining([]));
  });
});
