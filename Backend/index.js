const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const handelError = require("./middlewares/handelError");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const expenseRoutes = require("./routes/expense");
const incomeRoutes = require("./routes/income");
const budgetRoutes = require("./routes/budget")


dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'https://spend-wise-gyej.vercel.app',
  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());


connectDB();


app.use("/api/auth",authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/incomes", incomeRoutes);

app.use("/api/budgets", budgetRoutes);


app.get('/', (req, res) => {
  res.send('SpendWise API is running successfully!');
});


app.use(handelError);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


module.exports = app;