import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
  Put,
  Patch,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import * as type from '../../utils/type';
import { AuthGuard } from './guards/auth.guard';
import { AuthRolesGuard } from './guards/auth-role.guard';
import { Roles } from './decorators/user-role.decorator';
import { Role } from '../../utils/enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InitLoginDto } from './dtos/init-login.dto';
import { SetPasswordDto } from './dtos/set-password.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dtos/pagination.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // POST: ~/api/users/auth/register
  @Post('auth/register')
  @UseGuards(AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // POST: ~/api/users/auth/login
  @Post('auth/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // POST: ~/api/users/auth/init-login
  @Post('auth/init-login')
  @ApiOperation({ summary: 'Initial login check for password setup' })
  initLogin(@Body() initLoginDto: InitLoginDto) {
    return this.authService.initLogin(initLoginDto);
  }

  // POST: ~/api/users/auth/set-password
  @Post('auth/set-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set user password after initial login' })
  setPassword(
    @Body() setPasswordDto: SetPasswordDto,
    @CurrentUser() user: type.JWTPayloadType,
  ) {
    return this.authService.setPassword(user.sub, setPasswordDto);
  }

  // GET: ~/api/users/me
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  me(@CurrentUser() user: type.JWTPayloadType) {
    return this.usersService.getCurrentUser(user.sub);
  }

  // GET: ~/api/users/all
  @Get('all')
  @UseGuards(AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.getAllUsers(paginationDto);
  }

  // DELETE: ~/api/users/delete/:id
  @Delete('delete/:id')
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  // PATCH: ~/api/users/update/:id
  @Patch('update/:id')
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user (Admin only)' })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // POST: ~/api/users/add
  @Post('add')
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new user (Admin only)' })
  addUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.addUser(createUserDto);
  }

  // GET: ~/api/users/count
  @Get('count')
  @ApiOperation({ summary: 'Get total number of users' })
  async getNumberOfUsers() {
    return this.usersService.getNumberOfUsers();
  }
}
