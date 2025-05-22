// src/models/Product.model.ts
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'products' // Nombre de la tabla en tu base de datos
})
class Product extends Model {
    // Asegúrate de que 'declare' está aquí.
    // Esto le dice a TypeScript que 'id' ya está definido en la clase base de Model.
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number; // ¡Esta línea es crucial!

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    availability: boolean;
}

export default Product;