const { Router } = require("express");
const { createQuestionHandler, getQuestionsHandler, updateQuestionsHandler, deleteQuestionsHandler} = require('../Handler/questionHandler')


const router = Router();

router.post("/create", createQuestionHandler)
router.get("/", getQuestionsHandler)
router.patch("/update/:id", updateQuestionsHandler)
router.delete("/delete/:id", deleteQuestionsHandler)


module.exports = router