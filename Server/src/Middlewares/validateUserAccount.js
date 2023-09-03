const { areaTraining } = require("../db");

const validateUserAccount = async (req, res, next) => {
  const {
    name,
    lastName,
    birthDate,
    CUD,
    email,
    password,
    freelancer,
    description,
    address,
    activate,
    location,
    certificates,
    category,
  } = req.body;

  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!lastName) return res.status(400).json({ error: "Missing lastName" });
  if (!birthDate) return res.status(400).json({ error: "Missing birthDate" });

  if (!email) return res.status(400).json({ error: "Missing email" });
  if (!password) return res.status(400).json({ error: "Missing password" });
  if (!freelancer && !typeof "boolean")
    return res.status(400).json({ error: "Missing freelancer" });
  if (!location) return res.status(400).json({ error: "Missing location" });

  // if (!category) return res.status(404).json({ error: "Missing category" });

  if (typeof name !== "string")
    return res.status(400).json({ error: "Name has to be a string" });
  if (typeof lastName !== "string")
    return res.status(400).json({ error: "LastName has to be a string" });
  if (typeof birthDate !== "string")
    return res.status(400).json({ error: "BirthDate has to be a string" });
  // if (typeof CUD !== "string")
  //   return res.status(400).json({ error: "CUD has to be a string" });
  if (typeof email !== "string")
    return res.status(400).json({ error: "Email has to be a string" });
  if (typeof password !== "string")
    return res.status(400).json({ error: "Password has to be a string" });
  if (typeof freelancer !== "boolean")
    return res.status(400).json({ error: "Freelancer has to be a boolean" });
  if (typeof location !== "object")
    return res.status(400).json({ error: "Location has to be an object" });
  // if (typeof certificates !== "object")
  //   return res.status(400).json({ error: "Certificates has to be an object" });
  // if (typeof category !== "object")
  //   return res.status(400).json({ error: "Category has to be a object" });

  if (freelancer) {
    if (!description)
      return res.status(400).json({ error: "Missing description" });
    if (!address) return res.status(400).json({ error: "Missing address" });

    if (typeof description !== "string")
      return res.status(400).json({ error: "Description has to be a string" });
    if (typeof address !== "string")
      return res.status(400).json({ error: "Address has to be a string" });
  }

  // const existingRubros = await areaTraining.findAll();

  // const invalidRubros = category.filter((rubroName) => {
  //   return !existingRubros.some((rubro) => rubro.name === rubroName);
  // });

  // if (invalidRubros.length > 0) {
  //   return res.status(400).json({
  //     error: `Invalid categories input: (${invalidRubros.join(", ")})`,
  //   });
  // }

  next();
};

module.exports = {
  validateUserAccount,
};
