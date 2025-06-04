import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const Product = sequelize.define("Product", {
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    price: {type: DataTypes.FLOAT, allowNull: false},
    category: {type: DataTypes.STRING },
    quantity: {type: DataTypes.INTEGER},
    imageUrl: {type: DataTypes.STRING},
});
