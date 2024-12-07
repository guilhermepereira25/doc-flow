import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
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
  username: string;
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.TIME,
    defaultValue: DataType.NOW(),
  })
  created_at: Date;
  @Column({
    type: DataType.TIME,
    defaultValue: DataType.NOW(),
  })
  updated_at: Date;
}
