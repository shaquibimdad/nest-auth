import { Module } from '@nestjs/common';
import { EmployeeService } from './crud.service';
import { EmployeeController } from './crud.controller';
import { Employee, EmployeeSchema } from './schema/crud.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
