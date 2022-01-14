import { SkipAuth } from 'src/core/auth/decorators/is-public.decorator';
import { ExistsDto } from './dto/exists.dto';
import { PhotosService } from './photos.service';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { ApiMultiFile } from '../../shared/decorators/api-multifile.decorator';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private photoService: PhotosService) {}
  @SkipAuth()
  @Get()
  findAll() {
    return this.photoService.fidAll();
  }

  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const names = files.map((file) => ({
      name: file.filename,
    }));
    return this.photoService.insertMany(names);
  }

  @Delete(':_id')
  async remove(@Param() { _id }: ExistsDto) {
    await this.photoService.removeOne(_id);
    return 'Foto eliminada';
  }
}
