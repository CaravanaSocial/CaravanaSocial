const server = require("./app");
const { conn } = require("./db");
const PORT = 3001;
const { CreateData } = require("./Handler/countryHanlder");

conn.sync({ force: true }).then(async () => {
  await CreateData();
  server.listen(PORT, () => {
    console.log("%s listening at 3001");
  });
});
