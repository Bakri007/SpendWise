const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const handelError = require("./middlewares/handelError");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const expenseRoutes = require("./routes/expense");
const incomeRoutes = require("./routes/income");
const budgetRoutes = require("./routes/budget")
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:4200"
}));

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