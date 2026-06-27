import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParentsService } from './parents.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Parents')
@Controller('parents')
@UseGuards(AuthGuard)
export class ParentsController {
  constructor(private parentsService: ParentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() body: { email: string; password: string; firstName?: string; lastName?: string; phone?: string }) {
    return this.parentsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parents' })
  @ApiResponse({ status: 200, description: 'List of parents' })
  async findAll() {
    return this.parentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param('id') id: string) {
    return this.parentsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(@Param('id') id: string, @Body() body: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) {
    return this.parentsService.update(id, body);
  }

  @Put(':id/password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async changePassword(@Param('id') id: string, @Body() body: { newPassword: string }) {
    return this.parentsService.changePassword(id, body.newPassword);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.parentsService.deactivate(id);
  }
}
