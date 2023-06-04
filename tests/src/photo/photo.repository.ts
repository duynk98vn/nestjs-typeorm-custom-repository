import { Repository } from 'typeorm';

import { EntityRepository } from '../../../lib';
import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class CustomPhotoRepository extends Repository<Photo> {}
