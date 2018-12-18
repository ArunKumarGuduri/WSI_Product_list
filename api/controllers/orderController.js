var marketList = require("../json/marketList");

module.exports = {
  orderList: (req, res) => {
    res.json(marketList);
  }
};