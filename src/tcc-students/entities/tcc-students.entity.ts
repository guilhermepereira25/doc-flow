import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tcc } from 'src/tcc/entities/tcc.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'tcc_students',
  timestamps: false,
})
export class TccStudents extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Tcc)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  tcc_id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  student_id: string;

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
}
