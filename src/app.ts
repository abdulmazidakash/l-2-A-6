import express, { Request, Response } from 'express';

const app = express();

//parser
app.use(express.json());

// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'route not found',
        path: req.path,
    })
});

export default app;