import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Presence } from 'src/presences/entities/presence.entity';

@Table({
  tableName: 'events',
  timestamps: false,
})
export class Event extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;
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

  @HasMany(() => Presence)
  presences: Presence[];
}
