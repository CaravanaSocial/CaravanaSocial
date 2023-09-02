const { Router } = require("express");
const { filterTrainings } = require('../Handler/filterTrainingsHandler')

const router = Router();

router.get("/", filterTrainings)


module.exports = router