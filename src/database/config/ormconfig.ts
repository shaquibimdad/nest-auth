import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../components/user/entity/user.entity';
export function ormConfig(): TypeOrmModuleOptions {
  return {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    logging: true,
    database: 'Intern-Proj-Demo',
    useUnifiedTopology: true,
    entities: [User],
  };
}
