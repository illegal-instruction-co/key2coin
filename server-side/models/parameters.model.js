module.exports = (sequelize, Sequelize) => {
    const Parameters = sequelize.define("parameters", {
      parameter: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      value_:{
        type: Sequelize.STRING
      }
    });
    return Parameters;
};
