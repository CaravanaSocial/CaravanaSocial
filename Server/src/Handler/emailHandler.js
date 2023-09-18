const {
  getAdminAccController,
} = require("../Controller/Admin/getAdminAccController");
const {
  getCompanyAccController,
} = require("../Controller/Companies/getCompanyAccController");
const {
  getUserAccController,
} = require("../Controller/User/getUserAccController");

const emailVerifyHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const { code } = req.query;

    const adminResponse = await getAdminAccController(email, code);

    if (adminResponse) {
      if (adminResponse.superAdmin === true) {
        return res.status(200).json({ type: "superAdmin", acc: adminResponse });
      }

      return res.status(200).json({ type: "admin", acc: adminResponse });
    }

    const companyResponse = await getCompanyAccController(email, code);
    if (companyResponse) {
      return res.status(200).json({ type: "company", acc: companyResponse });
    }

    const userResponse = await getUserAccController(email, code);
    if (userResponse) {
      return res.status(200).json({ type: "user", acc: userResponse });
    }

    return res.status(404).json({ error: "Email no encontrado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  emailVerifyHandler,
};
