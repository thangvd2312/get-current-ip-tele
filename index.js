const axios = require("axios");
require('dotenv').config();
// Token của bot Telegram và Chat ID
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;


// Lấy IP hiện tại
async function getPublicIP() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
}

// Gửi thông báo qua Telegram
async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;
  try {
    const response = await axios.get(url);
    console.log("Message sent successfully", response.data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
// Hàm kiểm tra IP liên tục
async function monitorIP() {
  let currentIP = await getPublicIP();
  sendTelegramMessage(currentIP);
}

monitorIP();
