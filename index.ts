
import { Client, GatewayIntentBits } from "discord.js";


const token = process.env.BOT_TOKEN || "MTM1OTI5NDc2NTA2NTE3OTI3OA.GhdN5L.02TnwfVrbIkHZlGKnv2apux5o-JBDbIxmlKPSY"; 


const serverId = "1242893151459610666"; 
const channelId = "1242893151933563031"; 


const client = new Client({
  intents: [
   
   
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);

  client.user?.setActivity("with Discord.js");

  const guild = client.guilds.cache.get(serverId);
  if (!guild) {
    console.error("Guild not found!");
    return;
  }

  const channel = guild.channels.cache.get(channelId);
  if (!channel || !channel.isTextBased()) {
    console.error("Channel not found or it's not a text channel!");
    return;
  }

  channel.send("Hello, this is my message!")
    .then(() => {
      console.log("Message sent successfully!");
    })
    .catch((err) => {
      console.error("Error sending message: ", err);
    });
});
client.on("messageCreate", (message) => {
    if (message.content==="/iamready") {
        const userId = message.author.id;
        console.log(userId);
        client.users.fetch(userId)
            .then((user) => {
                user.send("Welcome Detective " + user.username + "! You are now ready to solve the case!");
            })
            .catch((err) => {
                console.error("Error fetching user: ", err);
            });
    }
});

client.login(token).catch((err) => {
  console.error("Error logging in: ", err);
});
