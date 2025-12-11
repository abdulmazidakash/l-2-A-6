import express, { Request, Response } from 'express';
import { initDB } from './config/db';
import { authRoutes } from './modules/auth/auth.route';
const app = express();

//parser
app.use(express.json());

// initialize database tables
initDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Welcome to Vehicle Rental Service API');
});

// auth routes
app.use('/api/v1/auth', authRoutes);


// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'route not found',
        path: req.path,
    })
});



export default app;