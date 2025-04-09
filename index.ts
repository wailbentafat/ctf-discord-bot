import { Client, GatewayIntentBits, Message, User, ChannelType, Partials } from "discord.js";
const token = process.env.BOT_TOKEN || "MTM1OTI5NDc2NTA2NTE3OTI3OA.GhdN5L.02TnwfVrbIkHZlGKnv2apux5o-JBDbIxmlKPSY";
const serverId = "1242893151459610666";
const channelId = "1242893151933563031";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const awaitingName = new Set<string>();

client.once("ready", () => {
  console.log(` Logged in as ${client.user?.tag}`);
  client.user?.setActivity("with Discord.js");

  const guild = client.guilds.cache.get(serverId);
  if (!guild) return console.error(" Guild not found!");

  const channel = guild.channels.cache.get(channelId);
  if (!channel?.isTextBased()) return console.error(" Channel not found or not text-based.");

  channel.send("Hello, this is my message!")
    .then(() => console.log("📨 Message sent successfully!"))
    .catch((err) => console.error(" Error sending message:", err));
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.content === "/iamready") {
    const user = message.author;
    try {
      await user.send(`Welcome Detective ${user.username}! You are now ready to solve the case!`);
      await user.send("Give us your full name, please.");
      awaitingName.add(user.id);
      console.log(` Awaiting full name from user ${user.username}`);
    } catch (err) {
      console.error(" Failed to DM user:", err);
      if (message.channel.type !== ChannelType.DM) {
        message.reply(" I couldn't DM you. Please make sure your DMs are open.");
      }
    }
    return;
  }
  if (message.channel.type === ChannelType.DM && awaitingName.has(message.author.id)) {
    const fullName = message.content.trim();
    const user = message.author;

    try {
      await message.channel.send(`Thank you, ${fullName}! The investigation will begin shortly.`);
      awaitingName.delete(user.id);
      startInvestigation(user, fullName);
    } catch (err) {
      console.error(" Error responding in DM:", err);
    }
  }
});
function startInvestigation(user: User, fullName: string) {
  user.send(
    `Detective ${fullName}, here's your first case:\n\n` +
    `🧠 **Case: The Silent Byte**\n` +
    `🧍‍♂️ Victim: Mohammed Bensalem (Cybersecurity student at USTHB)\n` +
    `🕵️ Scene: Salle 404 – window slightly ajar\n` +
    `🕗 Time: April 5, 2025, ~8:00 AM\n\n` +
    `Reply with: **start** to begin your investigation.`
  ).catch((err) => console.error("Couldn't send story:", err));
}

client.login(token).catch((err) => {
  console.error("Error logging in:", err);
});