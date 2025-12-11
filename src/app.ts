import express, { Request, Response } from 'express';

const app = express();

//parser
app.use(express.json());



export default app;