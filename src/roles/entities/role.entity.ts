import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Profile } from 'src/profile/entities/profile.entity';
@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  name: string;
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

  @BelongsToMany(() => Profile, 'profiles_roles', 'role_id', 'profile_id')
  profiles: Profile[];
}
