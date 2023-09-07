const {areaTraining} = require("../db")

const validateCompanyAccount = async (req, res, next) =>{
    const {
      name, lastName, position, nameCompany, email, password, phone, description, category, location, activate
    } = req.body

    if(!name) return res.status(404).json({error: "Missing name"})
    if(!lastName) return res.status(404).json({error: "Missing lastName"})
    if(!position) return res.status(404).json({error: "Missing position"})
    if(!nameCompany) return res.status(404).json({error: "Missing nameCompany"})
    if(!email) return res.status(404).json({error: "Missing email"})
    if(!password) return res.status(404).json({error: "Missing password"})
    if(!phone) return res.status(404).json({error: "Missing phone"})
    if(!description) return res.status(404).json({error: "Missing description"})
    if(!location) return res.status(404).json({error: "Missing location"})
    if(!category) return res.status(404).json({error: "Missing category"})

    if(typeof(password) !== "string") return res.status(400).json ({error: "Password has to be an string"})
    if (typeof lastName !== "string") return res.status(400).json({ error: "LastName has to be a string" });
    if (typeof position !== "string") return res.status(400).json({ error: "Position has to be a string" });
    if (typeof nameCompany !== "string") return res.status(400).json({ error: "NameCompany has to be a string" });
    if (typeof email !== "string") return res.status(400).json({ error: "Email has to be a string" });
    if (typeof password !== "string") return res.status(400).json({ error: "Password has to be a string" });
    if (typeof phone !== "string") return res.status(400).json({ error: "Phone has to be a string" });
    if (typeof description !== "string") return res.status(400).json({ error: "Description has to be a string" });
    if (typeof location !== "object") return res.status(400).json({ error: "Location has to be a object" });
    if (typeof category !== "object") return res.status(400).json({ error: "Category has to be a object" });

    const existingRubros = await areaTraining.findAll();

    const invalidRubros = category.filter((rubroName) => {
      return !existingRubros.some((rubro) => rubro.name === rubroName);
    });
  
    if (invalidRubros.length > 0) {
      return res.status(400).json({error: `Invalid categories input: (${invalidRubros.join(", ")})`})
    }

    next()
}

module.exports={
  validateCompanyAccount
}