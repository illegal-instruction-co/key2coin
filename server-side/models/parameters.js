const initialValue = [
  {
    parameter : "port",
    name : "port",
    value : "3001"
  },{
    parameter : "assumption",
    name : "assumption",
    value : "1.05"
  },{
    parameter : "delay",
    name : "delay",
    value : "10"
  },{
    parameter : "binance",
    name : "api_key",
    value : ""
  },{
    parameter : "binance",
    name : "secret_key",
    value : ""
  },{
    parameter : "binance",
    name : "endpoint1",
    value : ""
  },{
    parameter : "binance",
    name : "endpoint2",
    value : ""
  },{
    parameter : "binance",
    name : "endpoint3",
    value : ""
  },{
    parameter : "binance",
    name : "endpoint4",
    value : ""
  },{
    parameter : "commission_rate",
    name : "rate",
    value : "1"
  },{
    parameter : "expiry_date",
    name : "expiry_date",
    value : "90"
  },
]
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
    (async () => {
      await Parameters.count().then(c => {
        if(c < 1){
          initialValue.map(p => 
            Parameters.create({
              parameter: p.parameter,
              name : p.name,
              value_ : p.value
            })
          )
        }
      })
    })();
    return Parameters;
};
