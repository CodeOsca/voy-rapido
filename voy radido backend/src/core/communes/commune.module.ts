import { CommunesSeeder } from './commune.seeder';
import { Commune, CommuneSchema } from './communes.schema';
import { Module } from '@nestjs/common';
import { CommunesService } from './communes.service';
import { CommunesController } from './communes.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Commune.name, schema: CommuneSchema }])],
  providers: [CommunesService, CommunesSeeder],
  controllers: [CommunesController],
  exports: [CommunesService],
})
export class CommuneModule {}
