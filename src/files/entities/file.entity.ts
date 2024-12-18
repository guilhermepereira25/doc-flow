import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  AfterCreate,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { FileType } from '../enum/file-type.enum';
import { FileStatus } from '../enum/file-status.enum';

@Table({
  tableName: 'files',
  timestamps: false,
})
export class File extends Model {
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
  name: string;

  @Column({
    type: DataType.STRING,
  })
  path: string;
  @Column({
    type: DataType.ENUM(...Object.values(FileType)),
    allowNull: false,
  })
  type: FileType;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  event_id: string;

  @Column({
    type: DataType.ENUM(...Object.values(FileStatus)),
    defaultValue: FileStatus.STATUS_WAITING,
  })
  status: FileStatus;

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

  @BelongsTo(() => User, 'user_id')
  user: User;
  @BelongsTo(() => Event, 'event_id')
  event: Event;

  @AfterCreate
  static removeColumnAttributesAfterCreate(instance: File) {
    delete instance.dataValues.created_at;
    delete instance.dataValues.updated_at;
  }
}
