import type { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import type { DataSource, DataSourceOptions } from 'typeorm';

import { Repository } from './utils/custom-repository.type';
import { getCustomRepositoryToken, getEntityByRepository } from './utils/custom-repository.util';

function getProviders(repositories: Repository[], dataSource?: string | DataSource | DataSourceOptions): Provider[] {
  return repositories.map((repository) => {
    const entity = getEntityByRepository(repository);

    return {
      module: CustomRepositoryModule,
      provide: getCustomRepositoryToken(repository, dataSource),
      useFactory: (dataSource: DataSource) => {
        return new repository(entity, dataSource.manager);
      },
      inject: [getDataSourceToken(dataSource)],
    } as Provider<any>;
  });
}

export class CustomRepositoryModule {
  static forFeature(repositories: Repository[], dataSource?: string | DataSource | DataSourceOptions): DynamicModule {
    return {
      module: CustomRepositoryModule,
      providers: getProviders(repositories, dataSource),
      exports: getProviders(repositories, dataSource),
    };
  }
}
