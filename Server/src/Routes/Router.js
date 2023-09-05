const { Router } = require("express");
const offerRoute = require("./offerRoute");
const adminRoute = require("./adminRoute");
const rubroRoute = require("./categoriesRoute");
const companyRoute = require("./companyRoute");
const countryRoute = require("./countryRoute");
const loginRoute = require("./loginRoute");
const successRoute = require("./successStoriesRoute");
const trainingRoute = require("./trainingRoute");
const userRoute = require("./userRoute");
const imageRout = require("./imageRoute");
const filterRoute = require("./filterRoute");

const router = Router();

router.use("/offers", offerRoute);
router.use("/admin", adminRoute);
router.use("/rubro", rubroRoute);
router.use("/company", companyRoute);
router.use("/countries", countryRoute);
router.use("/login", loginRoute);
router.use("/success", successRoute);
router.use("/trainings", trainingRoute);
router.use("/user", userRoute);

//------------Cloudinay(PRUEBA)--------------
router.use("/image", imageRout);

//------------Filtros(PRUEBA)----------------
router.use("/filter", filterRoute);

module.exports = router;
