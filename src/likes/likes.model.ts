import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Like extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  likeId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wonderId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  liked: boolean;
}
