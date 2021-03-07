module.exports = (sequelize, Sequelize) => {
    const Redeem = sequelize.define("redeems", {
      email: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      expiry_date:{
        type: Sequelize.DATE
      },
      sales_id:{
        type: Sequelize.INTEGER
      }
    });
    return Redeem;
};
