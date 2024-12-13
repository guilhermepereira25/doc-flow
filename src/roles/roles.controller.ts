import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Response } from 'express';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enum/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Profiles(Profile.Admin)
  @Roles(Role.CREATE_ANY)
  @Post()
  create(@Res() res: Response, @Body() createRoleDto: CreateRoleDto) {
    try {
      const role = this.rolesService.create(createRoleDto);
      res.status(201).json(role);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      res.status(500).json({ message: err.message });
    }
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
