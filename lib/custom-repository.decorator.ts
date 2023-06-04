import { Inject } from '@nestjs/common';
import type { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm';

import { ENTITY_METADATA_KEY } from './custom-repository.constants';
import { Repository } from './utils/custom-repository.type';
import { getCustomRepositoryToken } from './utils/custom-repository.util';

export function EntityRepository(target: EntityTarget<ObjectLiteral>) {
  return function (constructor: { new (...args: any[]): any }) {
    Reflect.defineMetadata(ENTITY_METADATA_KEY, target, constructor);
  };
}

export function InjectCustomRepository(
  repository: Repository,
  dataSource: string | DataSource | DataSourceOptions = 'default',
) {
  return Inject(getCustomRepositoryToken(repository, dataSource));
}
