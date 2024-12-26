import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TccPresentationsService } from './tcc-presentations.service';
import { CreateTccPresentationDto } from './dto/create-tcc-presentation.dto';
import { UpdateTccPresentationDto } from './dto/update-tcc-presentation.dto';

@Controller('tcc-presentations')
export class TccPresentationsController {
  constructor(
    private readonly tccPresentationsService: TccPresentationsService,
  ) {}

  @Post()
  create(@Body() createTccPresentationDto: CreateTccPresentationDto) {
    return this.tccPresentationsService.create(createTccPresentationDto);
  }

  @Get()
  findAll() {
    return this.tccPresentationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tccPresentationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTccPresentationDto: UpdateTccPresentationDto,
  ) {
    return this.tccPresentationsService.update(+id, updateTccPresentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tccPresentationsService.remove(+id);
  }
}
