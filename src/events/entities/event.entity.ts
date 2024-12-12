import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Presence } from 'src/presences/entities/presence.entity';

@Table({
  tableName: 'events',
  timestamps: false,
})
export class Event extends Model {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier of the event',
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: number;
  @ApiProperty({
    example: 'Event 1',
    description: 'Name of the event',
  })
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    example: '2021-01-01',
    description: 'Date that the event was created',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;
  @ApiProperty({
    example: '2021-01-01',
    description: 'Event update information',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  @HasMany(() => Presence, 'event_id')
  presences: Presence[];
}
