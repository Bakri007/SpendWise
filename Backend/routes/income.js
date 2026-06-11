const { getIncomes, createIncome, updateIncome, deleteIncome }=require("../controllers/income");
const router = require("express").Router()
const { verifyToken }  = require("../middlewares/auth");


router.get("/", verifyToken ,getIncomes);
router.post("/", verifyToken ,createIncome);
router.put("/:id", verifyToken ,updateIncome);
router.delete("/:id", verifyToken ,deleteIncome);



module.exports = router;