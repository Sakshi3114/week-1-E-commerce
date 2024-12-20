const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes-')

mongoose.connect("mongodb+srv://sharmasakshi3114:sakshi3114@cluster0.e3h28.mongodb.net/").then(() => console.log('MongoDb connected.')).catch(error => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorisation',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/product',adminProductsRouter);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT} `));