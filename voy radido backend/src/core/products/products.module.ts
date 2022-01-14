import { EventEmitterHooksRecorder } from './hooks/event-emitter-hooks';
import { PriceCalculator } from './models/price-calculator.model';
import { IsValidOperationConstraint } from './validators/valid-operation.validator';
import { DispatchesModule } from './../dispatches/dispatches.module';
import { ProductsController } from './products.controller';
import { CommuneModule } from './../communes/commune.module';
import { BuildService } from './build.service';
import { Product, ProductsSchema } from './products.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { CommuneCalculator } from './models/calculators/commune-calculator.model';
import { MinProductsConstraint } from './validators/min-products.validator';
import { MongoHooksEventService } from 'src/modules/mongo-hooks-event/mongo-hooks-event.service';
import { HooksRecorder } from './hooks/products.hooks';

@Module({
  imports: [
    CommuneModule,
    DispatchesModule,
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: (mongoEvent: MongoHooksEventService) => mongoEvent.forSchema(Product.name, ProductsSchema),
        inject: [MongoHooksEventService],
      },
    ]),
  ],
  providers: [
    ProductsService,
    BuildService,
    IsValidOperationConstraint,
    PriceCalculator,
    CommuneCalculator,
    MinProductsConstraint,
    HooksRecorder,
    EventEmitterHooksRecorder,
  ],
  controllers: [ProductsController],
  exports: [ProductsService, BuildService],
})
export class ProductsModule {}
