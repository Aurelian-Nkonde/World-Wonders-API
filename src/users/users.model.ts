import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { userStatus } from './enums/status.enum';
import { userRole } from './enums/role.enum';
import { EnumDataType } from 'sequelize/types/data-types';

@Table({
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(userStatus)),
    allowNull: false,
  })
  activeStatus: EnumDataType<userStatus>;

  @Column({
    type: DataType.ENUM(...Object.values(userRole)),
    allowNull: false,
  })
  role: EnumDataType<userRole>;
}
