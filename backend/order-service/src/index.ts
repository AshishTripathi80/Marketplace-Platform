import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from "./config/db.config";
import orderRoutes from './routes/order.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/orders', orderRoutes);

// Sync the database and start the server
sequelize.sync().then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
})
