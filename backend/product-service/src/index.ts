import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from "./config/db.config";
import productRouter from './routes/product.route';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRouter);

// Sync the database and start the server
sequelize.sync().then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
})
