const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require("./routes/fileRoutes");



env.config();


app.use(cors());
app.use(express.json());
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
.then(() => console.log("MongoDB Connected to Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes)



const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Library server is running on port ${PORT}`);
});