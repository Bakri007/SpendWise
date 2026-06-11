const { getExpenses, createExpense, updateExpense, deleteExpense }=require("../controllers/expense");
const router = require("express").Router()
const { verifyToken }  = require("../middlewares/auth");


router.get("/", verifyToken ,getExpenses);
router.post("/", verifyToken ,createExpense);
router.put("/:id", verifyToken ,updateExpense);
router.delete("/:id", verifyToken ,deleteExpense);



module.exports = router;