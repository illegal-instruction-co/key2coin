module.exports = (sequelize, Sequelize) => {
    const Currencies = sequelize.define("currencies", {
      currency: {
        type: Sequelize.STRING
      },
      currency_code: {
        type: Sequelize.STRING
      },
      currency_symbol:{
        type: Sequelize.STRING
      }
    });
    return Currencies;
};
