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
const imageRout = require('./imageRoute')
const filterRoute =  require('./filterRoute')
const freelancerRoute = require('./freelancerRoute')
const user_trainingRoute = require('./user_trainingRoute')
const questionRoute = require('./questionRoute');

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
router.use('/freelancer', freelancerRoute)
router.use('/user-training', user_trainingRoute)
router.use('/question', questionRoute)

//------------Cloudinay(PRUEBA)--------------
router.use("/image", imageRout);

//------------Filtros(PRUEBA)----------------
router.use("/filter", filterRoute);

module.exports = router;
