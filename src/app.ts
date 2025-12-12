import express, { Request, Response } from 'express';
import { initDB } from './config/db';
import { authRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/users/user.route';
import { vehicleRoutes } from './modules/vehicles/vehicle.route';
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

// user routes
app.use('/api/v1/users', UserRoutes);

// vehicle routes
app.use('/api/v1/vehicles', vehicleRoutes);


// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'route not found',
        path: req.path,
    })
});



export default app;