const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const os = require("os");

const { Subscriber } = require("../../models");

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "client-one" })
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
//   console.log(message);
  if (message.body.toUpperCase() === "REG HADITS") {
    Subscriber.create({
      hp: message.from.split("@")[0],
      name: message._data.notifyName,
      deleted: 0
    });

    for (let i = 0; i <= 100; i++) {
      client.sendMessage("6285158127726@c.us", `Testing ke - ${i}`);
    }
  }

  if (message.body.toLowerCase() === "cpus") {
    // console.log(os.cpus())
    client.sendMessage(message.from, os.cpus()[0].model);
  }
});

module.exports = client;
