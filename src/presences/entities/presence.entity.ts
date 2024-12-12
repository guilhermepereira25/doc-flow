import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'presences',
  timestamps: false,
})
export class Presence extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  event_id: number;
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Event, 'event_id')
  event: Event;
}
