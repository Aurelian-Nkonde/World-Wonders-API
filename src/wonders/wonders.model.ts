import { DataTypes, EnumDataType } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Continent } from './enums/continent.enum';
// import { User } from 'src/users/users.model';

@Table({
  timestamps: true,
})
export class Wonder extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wonderId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  likes: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isLiked: boolean;

  @Column({
    type: DataTypes.ENUM(...Object.values(Continent)),
    allowNull: false,
  })
  continent: EnumDataType<Continent>;
}
