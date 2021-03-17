const { AwesomeQR } = require("awesome-qr");
const fs = require("fs");
const K2C = require("./blockchain.js")
// ...

async function proofOfConcept() {
  const safeBackground = fs.readFileSync("../patterns/safeqr.png");
  const voucherBackground = fs.readFileSync("../patterns/voucherqr.png");

  var key = "00000000-0000-0000-0000-000000000001"
  var fB = new K2C.CryptoBlock(1, "15/03/2021", key, {
    crypto_name: "BTC",
    crypto_voucher_total: 55.05,
    payment_total: 57.02
  })

  const buffer = await new AwesomeQR({
    text: JSON.stringify(fB, null, 4),
    size: 500,
    backgroundImage: safeBackground,
  }).draw();

  fs.writeFileSync(`../k2c/${key}_safe.png`, buffer);

  var fB2 = new K2C.CryptoBlock(1, "16/03/2021", key, {
    hash: "95c3247d5a2f2e6977ca5b35be67c1ffc2e487ed9c71670b77abb218c4e9d205"
  })

  const buffer2 = await new AwesomeQR({
    text: JSON.stringify(fB2, null, 4),
    size: 500,
    backgroundImage: voucherBackground,
  }).draw();

  fs.writeFileSync(`../k2c/${key}_voucher.png`, buffer2);

}

proofOfConcept()
