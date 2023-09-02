const { Router } = require("express");
const offerRoute = require('./offerRoute')
const adminRoute = require('./adminRoute')
const rubroRoute = require('./categoriesRoute')
const companyRoute = require('./companyRoute')
const countryRoute = require('./countryRoute')
const loginRoute = require('./loginRoute')
const successRoute = require('./successStoriesRoute')
const trainingRoute = require('./trainingRoute')
const userRoute = require('./userRoute')


const router = Router();

router.use("/offer", offerRoute)
router.use("/admin", adminRoute)
router.use("/rubro", rubroRoute)
router.use('/company', companyRoute)
router.use('/countries', countryRoute)
router.use("/login", loginRoute)
router.use('/success', successRoute)
router.use('/training', trainingRoute)
router.use('/user', userRoute)

module.exports = router