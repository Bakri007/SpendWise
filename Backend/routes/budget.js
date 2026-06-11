const { getBudget, createBudget, updateBudget, deleteBudget }=require("../controllers/budget");
const router = require("express").Router()
const { verifyToken }  = require("../middlewares/auth");


router.get("/", verifyToken ,getBudget);
router.post("/", verifyToken ,createBudget);
router.put("/:id", verifyToken ,updateBudget);
router.delete("/:id", verifyToken ,deleteBudget);



module.exports = router;