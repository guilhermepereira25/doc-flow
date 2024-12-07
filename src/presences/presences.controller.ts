import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Controller('presences')
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) {}

  @Post()
  create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presencesService.create(createPresenceDto);
  }

  @Get()
  findAll() {
    return this.presencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresenceDto: UpdatePresenceDto) {
    return this.presencesService.update(+id, updatePresenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presencesService.remove(+id);
  }
}
