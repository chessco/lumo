import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TenantOwnershipGuard } from '../../common/guards/tenant-ownership.guard';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  async create(@Body() body: { name: string; slug: string; email?: string; phone?: string; address?: string }) {
    return this.organizationsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  async findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @UseGuards(TenantOwnershipGuard)
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'Organization details' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findById(@Param('id') id: string) {
    return this.organizationsService.findById(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get organization by slug' })
  @ApiResponse({ status: 200, description: 'Organization details' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.organizationsService.findBySlug(slug);
  }

  @Put(':id')
  @UseGuards(TenantOwnershipGuard)
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({ status: 200, description: 'Organization updated successfully' })
  async update(@Param('id') id: string, @Body() body: { name?: string; email?: string; phone?: string; address?: string; logo?: string }) {
    return this.organizationsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(TenantOwnershipGuard)
  @ApiOperation({ summary: 'Deactivate organization' })
  @ApiResponse({ status: 200, description: 'Organization deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.organizationsService.deactivate(id);
  }
}
