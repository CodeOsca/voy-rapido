import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/core/auth/decorators/is-public.decorator';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { CommunesService } from './communes.service';
import { CreateDto, ExistsDto, ExistsManyDto, StatusDto, UpdateDto } from './dto';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Communes')
@Controller('Communes')
export class CommunesController {
  constructor(private readonly communesService: CommunesService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.communesService.create(createDto);
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.communesService.findAll();
  }

  @SkipAuth()
  @Get('active')
  findAllActive() {
    return this.communesService.findAll({ status: true });
  }

  @SkipAuth()
  @ApiParam({ name: '_id', type: 'string' })
  @Get(':_id')
  async findOne(@Param() { _id }: ExistsDto) {
    return this.communesService.findOne({ _id });
  }

  @Put('change-status')
  async changeStatus(@Body() { status, _ids }: StatusDto) {
    await this.communesService.updateMany(_ids, { status });
    return 'Comuna actualizada';
  }

  @Put()
  async update(@Body() updateDto: UpdateDto) {
    await this.communesService.updateOne(updateDto._id, updateDto);
    return 'Comuna actualizada';
  }

  @Delete()
  async remove(@Body() { _ids }: ExistsManyDto) {
    await this.communesService.removeMany(_ids);
    return 'Comuna eliminada';
  }
}
