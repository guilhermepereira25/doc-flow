import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tcc } from 'src/tcc/entities/tcc.entity';

@Table({
  tableName: 'tcc_presentations',
  timestamps: false,
})
export class TccPresentation extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  tcc_id: string;

  @Column({
    type: DataType.ENUM('first', 'second'),
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

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

  @BelongsTo(() => Tcc, 'tcc_id')
  tcc: Tcc;
}
