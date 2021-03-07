var moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    const Sales = sequelize.define("sales", {
      crypto_name: {
        type: Sequelize.STRING
      },
      crypto_voucher_total: {
        type: Sequelize.FLOAT
      },
      full_name:{
        type: Sequelize.STRING
      },
      key_:{
        type: Sequelize.STRING
      },
      payment_total:{
        type: Sequelize.FLOAT
      },
      rate_of_exchange:{
        type: Sequelize.STRING
      }
    });
    Sales.afterCreate((sales, options) =>{
      sequelize.models.redeems.create({
        sales_id: sales.id,
        expiry_date: moment(sales.createdAt).add(5, 'days'),
        status:0
      })
    })
  
    return Sales;
};
