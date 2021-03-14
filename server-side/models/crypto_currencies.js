module.exports = (sequelize, Sequelize) => {
    const CryptoCurrencies = sequelize.define("crypto_currencies", {
      crypto: {
        type: Sequelize.STRING
      },
      crypto_code: {
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.BOOLEAN
      }
    });
    return CryptoCurrencies;
};
