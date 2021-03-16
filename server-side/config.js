/*
Colors
*/
const Colors = require('./utilitys/colors')
const Time = require('./utilitys/time')

const Config = {}

Config.branding = {
  /*
  Project name:
  */
  project_name: "K2C"
}

Config.database = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "key2coin",
  dialect: "mysql",
  timezone: "Europe/Istanbul",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+03:00'
}

  Config.development = {
    /*
    Development port
    */
    port: 3001
  }

  Config.basis = {
    /*
    Terminal logs for
    error debugging
    */
    terminal_logs: true,
    log_prefix: Colors.FgCyan + '[LOG]' + Colors.Reset,
    error_log_prefix: Colors.FgRed + '[ERROR]' + Colors.Reset,

    /*
    USDT/USD assumption
    */
    usdtusd: 1.05,

    /*
    Regular delay for
    necessary points
    */
    delay: 10,

    /*
    JWT
    */
    JWT: {
      secret_key_lenght: 20,
      secret_key_temp: 'jwt_secret_key_temp',
    },

    /*
    24hr statistics
    */
    daily_statistics: {
      data_temp: '24h_changes_statistics'
    },

    /*
    Hourly prices
    */
    hourly_prices: {
      data_temp: 'hourly_prices'
    }
  }

  /*
  External stuff
  */
  Config.external = {

    /*
    Rest API
    */

    // Binance
    binance: {
      api_key: '33taJBXlKmY5aCRopQob1tlPo99rq9zouUtSwjdj3KIaH1HXjxs04iQmgqpC3uMv',
      secret_key: 'vXeRToDha0ujyNZRdY6VYv8WhubYWW0g6SHEjZ1FZD6kaqgoWhBq4HXofK63H6sv',
      api_endpoints: [
        "https://api.binance.com",
        "https://api1.binance.com",
        "https://api2.binance.com",
        "https://api3.binance.com"
      ]
    },

    // Exchange Rate API
    exchangeratesapi: {
      api_endpoint: "https://api.exchangeratesapi.io"
    }

  }

  /*
  Cronojobs
  */
  Config.crono = {

    jobs: [
      {
        job: "jwt_secret_key_generator",
        timer: Time.day,
        run_at_start: true
      },
      {
        job: "24h_change_statistics_updater",
        timer: 5 * Time.minute,
        run_at_start: true
      },
      {
        job: "supported_crypto_currencys_hourly_prices_updater",
        timer: Time.hour,
        run_at_start: false
      }
    ]

  }

  /*
  Supported currencys
  */
  Config.supported_currencys = [
    "USD",
    "EUR",
    "TRY",
    "SEK"
  ]

  /*
  Supported crypto currencys
  */
  Config.supported_crypto_currencys = [
    "BTC",
    "ETH",
    "LTC",
    "DOGE",
    "BCH",
    "XRP"
  ]

  /*
  Supported Languages
  */
  Config.supported_languages = {
    "en" : {
      "nav_buy": "Buy",
      "nav_redeem": "Redeem Key",
      "nav_about": "About",
      "nav_developers": "Docs",
      "buy_instantly": "Buy instantly",
      "voucher_value": "Key balance value",
      "currently_worth": "Currently worth",
      "buy_now": "Buy Now",
      "payment_control": "We accept main payment methods in your country",
      "for_last_24_hours":"for last 24 hours",
      "payment":"Payment",
      "card_number":"Card Number",
      "name": "Name",
      "valid_thru": "Valid Thru",
      "cvc": "CVC",
      "pay":"PAY",
      "enter_the_code": "Enter the key",
      "enter_the_code_ph": "00000000-0000-0000-0000-000000000000",
      "email":"E-mail",
      "email_ph": "your@email.com",
      "term_check": "* I acknowledge that I have read and fully agree to Key2Coin's Terms & Conditions.",
      "newsletter_check": "I agree to recieve marketing emails from Key2Coin",
      "redeem_button_continue": "Continue",
      "developers": "Developers"
    },
    "tr":{
      "nav_buy": "Satın Al",
      "nav_redeem": "Key Kullan",
      "nav_about": "About",
      "nav_developers": "Docs",
      "buy_instantly": "Hemen Satın Al",
      "voucher_value": "Key Bakiye Değeri",
      "currently_worth": "Şuandaki Değeri",
      "buy_now": "Hemen Satın Al",
      "payment_control": "Ülkenizdeki ana ödeme yöntemlerini kabul ediyoruz",
      "for_last_24_hours":"son 24 saat",
      "payment":"Ödeme",
      "card_number":"Kart Numarası",
      "name": "Ad Soyad",
      "valid_thru": "SKT",
      "cvc": "CCV",
      "pay":"Ödeme Yap",
      "enter_the_code": "Keyi girin",
      "enter_the_code_ph": "00000000-0000-0000-0000-000000000000",
      "email": "E-posta",
      "email_ph": "sizin@epostanız.com",
      "term_check": "* Key2Coin Hüküm ve Koşullarını okuduğumu ve tamamen kabul ettiğimi kabul ediyorum.",
      "newsletter_check": "Key2Coin'dan pazarlama e-postaları almayı kabul ediyorum" ,
      "redeem_button_continue": "Devam Et",
      "developers": "Geliştirici"
    },
    "fr": {
      "nav_buy": "Acheter",
      "nav_redeem": "Utiliser la clé",
      "nav_about": "About",
      "nav_developers": "Docs",
      "buy_instantly": "Acheter maintenant",
      "voucher_value": "Valeur du solde clé",
      "currently_worth": "Valeur actuelle",
      "buy_now": "Acheter maintenant",
      "payment_control": "Nous acceptons les principaux modes de paiement dans votre pays",
      "for_last_24_hours": "dernières 24 heures",
      "payment": "Paiement",
      "card_number": "Numéro de carte",
      "name": "Nom Prénom",
      "valid_thru": "SKT",
      "cvc": "CCV",
      "pay": "Payer",
      "enter_the_code": "Entrez la clé",
      "enter_the_code_ph": "00000000-0000-0000-0000-000000000000",
      "email": "E-mail",
      "email_ph": "votre@email.com",
      "term_check": "* Je reconnais que j'ai lu et j'accepte pleinement les conditions générales de Key2Coin.",
      "newsletter_check": "J'accepte de recevoir des e-mails marketing de Key2Coin",
      "redeem_button_continue": "Continuez",
      "developers": "Développeuses"
    },
    "es": {
      "nav_buy": "Comprar",
      "nav_redeem": "Canjear clave",
      "nav_about": "About",
      "nav_developers": "Docs",
      "buy_instantly": "Comprar ahora",
      "voucher_value": "Valor de saldo clave",
      "currently_worth": "Valor actual",
      "buy_now": "Comprar ahora",
      "payment_control": "Aceptamos los principales métodos de pago de su país",
      "for_last_24_hours": "últimas 24 horas",
      "payment": "Pago",
      "card_number": "Número de tarjeta",
      "name": "Nombre Apellido",
      "valid_thru": "Fecha de caducidad",
      "cvc": "CVC",
      "pay": "Paga",
      "enter_the_code": "Introduzca la clave",
      "enter_the_code_ph": "00000000-0000-0000-0000-000000000000",
      "email": "E-mail",
      "email_ph": "tu@email.com",
      "term_check": "* Reconozco que he leído y acepto totalmente los Términos y condiciones de Key2Coin.",
      "newsletter_check": "Acepto recibir correos electrónicos de marketing de Key2Coin",
      "redeem_button_continue": "Continuar",
      "developers": "Desarrolladores"
    }
  }


  module.exports = Config;
