const cardano = require("./cardano");

const bilal = cardano.wallet("Bilal");
const fasih = cardano.wallet("Fasih");
const haider = cardano.queryUtxo('addr_test1qr94r8rg0hmyrwe37up3lldkcv7hln99kwkd6gnwv2wzqq3gxj6v24vdrm9c7kt36wxe0yl8aft9vkj5kqzkjnycugjsxr3sa8');

console.log("Bilal: ", bilal.balance());

console.log("Fasih: ", fasih.balance());

console.log('haider: ', haider);


