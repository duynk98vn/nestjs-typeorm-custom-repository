import { EntityManager, EntityTarget, ObjectLiteral, QueryRunner, Repository as TypeOrmRepository } from 'typeorm';

export interface Repository extends Function {
  new (target: EntityTarget<any>, manager: EntityManager, queryRunner?: QueryRunner): TypeOrmRepository<ObjectLiteral>;
}
