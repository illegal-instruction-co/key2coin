const langTexts = [
  "nav_buy",
  "nav_redeem",
  "buy_instantly",
  "voucher_value",
  "currently_worth",
  "buy_now",
  "payment_control",
  "for_last_24_hours",
  "payment",
  "card_number",
  "name",
  "valid_thru",
  "cvc",
  "pay",
  "enter_the_code",
  "enter_the_code_ph",
  "email",
  "email_ph",
  "term_check",
  "newsletter_check",
  "redeem_button_continue",
  "developers",
  "card1title",
  "card1content",
  "card2title",
  "card2content",
  "card3title",
  "card3content",
  "card4title",
  "card4content",
];
module.exports = (sequelize, Sequelize) => {
  const Languages = sequelize.define("languages", {
      language: {
        type: Sequelize.STRING
      },
      short_name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      }
  });
  Languages.afterCreate((language, options) =>{
    langTexts.map(txt => 
      sequelize.models.translates.create({
        language_id: language.id,
        key: txt
      })
    )
  })

  return Languages;
};
