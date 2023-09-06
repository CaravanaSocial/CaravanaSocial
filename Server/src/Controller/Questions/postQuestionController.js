const { question } = require("../../db");

const questionCreateController = async (body) => {
  try {
    const { quest, answer } = body;

    if (!quest || !answer)
      throw new Error("Faltan datos relevantes para crear la pregunta");

    const [questions, created] = await question.findOrCreate({
      where: {
        question: quest,
      },
      defaults: {
        question: quest,
        answer: answer,
      },
    });

    return created;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  questionCreateController,
};
