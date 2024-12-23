import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { File } from 'src/files/entities/file.entity';
import { Presence } from 'src/presences/entities/presence.entity';
import { Profile } from 'src/profile/entities/profile.entity';
@Scopes(() => ({
  excludePassword: {
    attributes: { exclude: ['password'] },
  },
}))
@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID',
  })
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Username',
  })
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Profile ID',
  })
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  profile_id: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date and time of user creation',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW(),
  })
  created_at: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date and time of user update',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW(),
  })
  updated_at: Date;

  @BelongsTo(() => Profile, 'profile_id')
  profile: Profile;

  @HasMany(() => Presence, 'user_id')
  presences: Presence[];

  @HasMany(() => File, 'user_id')
  files: File[];
}
