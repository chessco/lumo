import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChildrenService } from './children.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TenantOwnershipGuard } from '../../common/guards/tenant-ownership.guard';

@ApiTags('Children')
@Controller('children')
@UseGuards(AuthGuard, TenantOwnershipGuard)
export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new child profile' })
  @ApiResponse({ status: 201, description: 'Child profile created successfully' })
  async create(@Body() body: {
    firstName: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    parentId?: string;
    teacherId?: string;
    preferences?: any;
  }) {
    return this.childrenService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all children in organization' })
  @ApiResponse({ status: 200, description: 'List of children' })
  async findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get child by ID' })
  @ApiResponse({ status: 200, description: 'Child details' })
  @ApiResponse({ status: 404, description: 'Child not found' })
  async findById(@Param('id') id: string) {
    return this.childrenService.findById(id);
  }

  @Get('parent/:parentId')
  @ApiOperation({ summary: 'Get children by parent ID' })
  @ApiResponse({ status: 200, description: 'List of children for parent' })
  async findByParent(@Param('parentId') parentId: string) {
    return this.childrenService.findByParent(parentId);
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ summary: 'Get children by teacher ID' })
  @ApiResponse({ status: 200, description: 'List of children for teacher' })
  async findByTeacher(@Param('teacherId') teacherId: string) {
    return this.childrenService.findByTeacher(teacherId);
  }

  @Put(':id/assign-teacher')
  @ApiOperation({ summary: 'Assign teacher to child' })
  @ApiResponse({ status: 200, description: 'Teacher assigned successfully' })
  async assignTeacher(@Param('id') id: string, @Body() body: { teacherId: string }) {
    return this.childrenService.assignTeacher(id, body.teacherId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update child profile' })
  @ApiResponse({ status: 200, description: 'Child profile updated successfully' })
  async update(@Param('id') id: string, @Body() body: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    preferences?: any;
  }) {
    return this.childrenService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate child profile' })
  @ApiResponse({ status: 200, description: 'Child profile deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.childrenService.deactivate(id);
  }
}
