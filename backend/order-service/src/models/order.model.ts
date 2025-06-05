import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const Order= sequelize.define('Order',{
    userId:{ type: DataTypes.STRING, allowNull:false },
    
    products: { type: DataTypes.JSON,// [{ productId: 1, quantity: 2 }]
        allowNull:false},
    
    totalAmount: { type: DataTypes.FLOAT, allowNull:false},
    
    status: {
    type: DataTypes.ENUM('PENDING', 'PAID', 'SHIPPED', 'CANCELLED'),
    defaultValue: 'PENDING',
  }
});