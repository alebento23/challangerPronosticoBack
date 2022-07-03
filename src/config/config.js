require("dotenv").config();

const PORT = process.env.PORT;
const urlIpInfo = process.env.URL_IPINFO;
const urlWeaterApi = process.env.URL_WEATER_API;
const token = process.env.TOKEN;
module.exports = { PORT, urlIpInfo, urlWeaterApi, token };
