import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
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
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
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
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  profile_id: string;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW(),
  })
  created_at: Date;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW(),
  })
  updated_at: Date;

  @BelongsTo(() => Profile, 'profile_id')
  profile: Profile;

  @HasMany(() => Presence, 'user_id')
  presences: Presence[];
}
