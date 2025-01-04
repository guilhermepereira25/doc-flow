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
  async create(@Body() createTccPresentationDto: CreateTccPresentationDto) {
    return await this.tccPresentationsService.create(createTccPresentationDto);
  }

  @Get()
  async findAll() {
    return await this.tccPresentationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tccPresentationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTccPresentationDto: UpdateTccPresentationDto,
  ) {
    return await this.tccPresentationsService.update(
      id,
      updateTccPresentationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tccPresentationsService.remove(id);
  }
}
