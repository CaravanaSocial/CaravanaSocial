const { Router } = require("express");
const { postBlogHandler, getAllBlogHandler, getByIdHandler, patchBlogHandler, deleteBlogHandler } = require('../Handler/blogHandler')

const router = Router();

router.post("/create", postBlogHandler);
router.get("/all", getAllBlogHandler);
router.get("/:id", getByIdHandler);
router.patch("/update/:id", patchBlogHandler);
router.delete("/delete/:id", deleteBlogHandler)


module.exports = router;


