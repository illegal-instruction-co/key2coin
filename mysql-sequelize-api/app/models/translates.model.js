module.exports = (sequelize, Sequelize) => {
    const Translates = sequelize.define("translates", {
      key: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.TEXT
      },
      language_id:{
        type: Sequelize.INTEGER
      }
    });
  
    return Translates;
};
