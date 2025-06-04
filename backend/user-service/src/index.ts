import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import { sequelize } from './config/database';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', authRouter);

// Sync the database and start the server
sequelize.sync().then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
})
