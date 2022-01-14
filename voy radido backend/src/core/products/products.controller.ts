import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from './../auth/interfaces/current-user.interface';
import { ExistsDto as ExistsDispatchDto } from '../dispatches/dto/exists.dto';
import { ProductsService } from './products.service';
import { Body, Controller, Delete, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { ApiFile } from 'src/shared/decorators/api-singlefile.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { BuildService } from './build.service';
import { InjectUserToBody } from 'src/shared/decorators/inject-user.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { ExcelReader } from './models/excel/excel-reader.model';
import { ChangePriceDto, CreateDto, RemoveDto, RescheduleDeliveryDateDto, UpdateDto } from './dto';

@Roles(Role.CUSTOMER, Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsServices: ProductsService,
    private buildService: BuildService,
    private eventEmmiter: EventEmitter2,
  ) {}

  @InjectUserToBody()
  @Post('create')
  create(@Body() createProductsDto: CreateDto) {
    return this.productsServices.create(createProductsDto);
  }

  @InjectUserToBody()
  @Put()
  async update(@Body() updateProductsDto: UpdateDto) {
    const { _id } = updateProductsDto;
    await this.productsServices.updateOne(_id, updateProductsDto);
    return 'Producto actualizado';
  }

  @InjectUserToBody()
  @Delete()
  async remove(@Body() { _ids }: RemoveDto) {
    await this.productsServices.removeMany(_ids);
    return 'Productos eliminados';
  }

  @Roles(Role.ADMIN)
  @Post('reschedule')
  async reschedule(@Body() { _id, deliveryDate }: RescheduleDeliveryDateDto) {
    const product = await this.productsServices.findOne({ _id });
    this.eventEmmiter.emit('product.reschedule', product, deliveryDate);
    return 'Producto actualizado';
  }

  @Roles(Role.ADMIN)
  @Put('price')
  async changePrice(@Body() { _id, price }: ChangePriceDto) {
    await this.productsServices.updatePrice(_id, price);
    return 'Producto actualizado';
  }

  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @Post('upload/:_id')
  @UseInterceptors(FileInterceptor('file'))
  async createMany(
    @UploadedFile() { buffer }: Express.Multer.File,
    @Param() { _id }: ExistsDispatchDto,
    @User() user: CurrentUser,
  ) {
    const productsData = await new ExcelReader(buffer).read();
    const productsBuilt = await this.buildService.build(productsData, _id, user._id);
    return this.productsServices.createMany(productsBuilt);
  }
}
