import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TccService } from './tcc.service';
import { CreateTccDto } from './dto/create-tcc.dto';
import { UpdateTccDto } from './dto/update-tcc.dto';

@Controller('tcc')
export class TccController {
  constructor(private readonly tccService: TccService) {}

  @Post()
  create(@Body() createTccDto: CreateTccDto) {
    return this.tccService.create(createTccDto);
  }

  @Get()
  findAll() {
    return this.tccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTccDto: UpdateTccDto) {
    return this.tccService.update(+id, updateTccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tccService.remove(+id);
  }
}
