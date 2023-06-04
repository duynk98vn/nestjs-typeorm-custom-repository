## Description

Typeorm custom repository module for Nest framework (node.js) with `typeorm` v0.3+

## Installation

```bash
$ npm i @nestjs/typeorm-custom-repository
$ npm i @nestjs/typeorm typeorm
#or
$ yarn add @nestjs/typeorm-custom-repository
$ yarn add @nestjs/typeorm typeorm
```

> Note: `typeorm` v0.3+ and `@nestjs/typeorm` v8.1.0+

## Usage

Follow the example below:

Suppose we have two database connections for one database

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Photo } from './photo/photo.entity';

@Module({
	imports: [
        // default connection
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			entities: [Photo],
			...
		}),
        // and another connection with named `connection_2`
		TypeOrmModule.forRoot({
			name: 'connection_2',
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			entities: [Photo],
			...
		}),
	],
})
export class AppModule {}
```

This `CustomPhotoRepository` below uses the `@EntityRepository()` decorator to mark that it's a custom repository for the `Photo` entity.

`photo.repository.ts`

```typescript
import { EntityRepository } from '@nestjs/typeorm-custom-repository';
import { Repository } from 'typeorm';

import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class CustomPhotoRepository extends Repository<Photo> {}
```

`photo.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '@nestjs/typeorm-custom-repository';

import { CustomPhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
	imports: [
		CustomRepositoryModule.forFeature([CustomPhotoRepository]),
		CustomRepositoryModule.forFeature([CustomPhotoRepository], 'connection_2'),
	],
	providers: [PhotoService],
})
export class PhotoModule {}
```

This module uses the `forFeature()` method to define which repositories are registered in the current scope. With that in place, we can inject the PhotoRepository into the `PhotoService` using the `@InjectCustomRepository()` decorator. Or if this decorator is not used then the repositories will be injected by default connection:

`photo.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectCustomRepository } from '@nestjs/typeorm-custom-repository';

import { Photo } from './photo.entity';
import { CustomPhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
	constructor(
		private readonly customPhotoRepository: CustomPhotoRepository,
		@InjectCustomRepository(CustomPhotoRepository, 'connection_2')
		private readonly customPhotoRepository2: CustomPhotoRepository,
	) {}

	...
}
```

## License

[MIT licensed](LICENSE).
