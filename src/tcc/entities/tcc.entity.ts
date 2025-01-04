import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { TccStudents } from 'src/tcc-students/entities/tcc-students.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'tcc',
  timestamps: false,
})
export class Tcc extends Model {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  theme: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  advisor_id: string;

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

  @BelongsTo(() => User, 'advisor_id')
  advisor: User;

  @BelongsToMany(() => TccStudents, 'tcc_students', 'tcc_id', 'student_id')
  students: User[];
}
