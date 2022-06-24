const { Client, Intents, MessageActionRow, MessageButton } = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES , 
Intents.FLAGS.DIRECT_MESSAGES] });

function getPriceUsd() {
  return fetch("https://api.etherscan.io/api?module=stats&action=ethprice")
    .then(resethusd => {
      return resethusd.json()
    })
    .then(data => {
      return "$" + data.result.ethusd
    })
}

function getPriceBtc() {
  return fetch("https://api.etherscan.io/api?module=stats&action=ethprice")
    .then(resethbtc => {
      return resethbtc.json()
    })
    .then(data => {
      return data.result.ethbtc + " BTC"
    })
}

function getGas() {
  return fetch("https://api.blockcypher.com/v1/eth/main")
    .then(resgas => {
      return resgas.json()
    })
    .then(data => {
      return Math.round(data.medium_gas_price/1000000000) + " GWEI"
    })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  if (msg.author.bot) return

  if (msg.content === "gasbot") {
    msg.channel.send("Welcome to GASBOT")
    msg.channel.send("use `gas` to know current average gas fee in ETH")
    msg.channel.send("or use `eth usd` or `eth btc` to know current ETH prices")
  }
  if (msg.content === "eth") {
    msg.reply("try `eth usd` or `eth btc`")
  }
  if (msg.content === "eth usd") {
    getPriceUsd().then(con => msg.channel.send(con))
  }
  if (msg.content === "eth btc") {
    getPriceBtc().then(con => msg.channel.send(con))
  }
})

client.login(process.env.TOKEN)
