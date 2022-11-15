const cardano = require('./cardano')

const createTransaction = (tx) => {
  let raw = cardano.transactionBuildRaw(tx);
  let fee = cardano.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
  });
  tx.txOut[0].value.lovelace -= fee;
  return cardano.transactionBuildRaw({...tx, fee});
};

const signTransaction = (wallet, tx, script) => {
  return cardano.transactionSign({
    signingKeys: [wallet.payment.skey, wallet.payment.skey],
    scriptFile: script,
    txBody: tx,
  });
};

let wallet = cardano.wallet("Fasih");

let mintScript = {
  keyHash: cardano.addressKeyHash(wallet.name),
  type: "sig",
};

let policy = cardano.transactionPolicyid(mintScript);
const ASSET_NAME = "TestNFT";
const ASSET_NAME_HEX = ASSET_NAME.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
const ASSET_ID = policy + "." + ASSET_NAME_HEX;

const invalidAfter = cardano.queryTip().slot + 10000

let tx = {
invalidAfter,
  txIn: wallet.balance().utxo,
  txOut: [
    {
      address: wallet.paymentAddr,
      value: { ...wallet.balance().value, [ASSET_ID]: 22 },
    },
  ],
  mint: {
    actions: [{ type: "mint", quantity: -1, asset: ASSET_ID }],
    script: [mintScript]
  },
  witnessCount: 2,
};

// console.log(JSON.stringify(tx, null, 2))

let raw = createTransaction(tx);
console.log("Transaction: ", tx.txOut);
// let signed = signTransaction(wallet, raw, mintScript);
// let txHash = cardano.transactionSubmit(signed);
// console.log(txHash);
