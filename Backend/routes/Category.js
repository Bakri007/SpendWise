const { getCategories, createCategory, updateCategory, deleteCategory }=require("../controllers/category");
const router = require("express").Router()
const { verifyToken }  = require("../middlewares/auth");


router.get("/", verifyToken ,getCategories);
router.post("/", verifyToken ,createCategory);
router.put("/:id", verifyToken ,updateCategory);
router.delete("/:id", verifyToken ,deleteCategory);



module.exports = router;