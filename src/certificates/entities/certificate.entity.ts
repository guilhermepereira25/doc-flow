import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { File } from 'src/files/entities/file.entity';

@Table({
  tableName: 'files',
  timestamps: false,
})
export class Certificate extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
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
    type: DataType.UUID,
    allowNull: false,
  })
  file_id: string;
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
  @BelongsTo(() => File, 'file_id')
  file: File;
}
