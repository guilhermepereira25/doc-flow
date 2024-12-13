import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

enum FileType {
  PDF = 'pdf',
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  CERTIFICATE = 'certificate',
}

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
    allowNull: false,
  })
  url: string;
  @Column({
    type: DataType.ENUM(...Object.values(FileType)),
    allowNull: false,
  })
  type: FileType;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW(),
  })
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
}
