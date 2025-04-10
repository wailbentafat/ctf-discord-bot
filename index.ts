import {
  Client,
  GatewayIntentBits,
  Message,
  User,
  ChannelType,
  Partials,
} from "discord.js";
const token =
  process.env.BOT_TOKEN ||
  "MTM1OTI5NDc2NTA2NTE3OTI3OA.GhdN5L.02TnwfVrbIkHZlGKnv2apux5o-JBDbIxmlKPSY";
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
const userProgress = new Map<string, number>();
const flags = [
  "HACKIWHA{h1dd3n_4dm1n_p4n3l_f0und}",
  "HACKIWHA{l1n4s_pyth0n_scr1pt_cr4ck3d}",
  "HACKIWHA{4l1_w4s_1n_b0u1r4}",
  "HACKIWHA{bl0g_c00k13_t4mp3r3d}",
  "HACKIWHA{m0rs3_c0d3_d3c0d3d}",
  "HACKIWHA{g1t_h1st0ry_n3v3r_l13s}",
];

const challengeParts = [
  {
    description:
      "**Part 1: Professor Jamel's Hidden Panel**\n\n" +
      "🔍 *Challenge Type: Web Exploitation*\n\n" +
      "You've gained access to the university's systems. Professor Jamel, known for his rigid methods and dark past in cyber-intelligence, " +
      "might have left traces in a hidden admin panel.\n\n" +
      "💡 *Hint: Sometimes the most secure panels are hidden in plain sight.*\n\n" +
      "Submit the flag when you find the hidden message.",
    flag: flags[0],
  },
  {
    description:
      "**Part 2: Lina's Encrypted Vengeance**\n\n" +
      "🔍 *Challenge Type: Reverse Engineering*\n\n" +
      "A suspicious Python script has been found on the victim's computer. It appears to be from Lina Douri, " +
      "Mohammed's former partner at Phobos Labs. The script is password-protected and might contain crucial evidence.\n\n" +
      "💡 *Hint: Check for common encryption patterns in the bytecode.*\n\n" +
      "Submit the flag after cracking the script.",
    flag: flags[1],
  },
  {
    description:
      "**Part 3: Ali's Location Data**\n\n" +
      "🔍 *Challenge Type: Digital Forensics*\n\n" +
      "A burner phone found near the lab might belong to Ali 'The Coder'. Extract the GPS data " +
      "to verify his whereabouts during the murder.\n\n" +
      "💡 *Hint: Metadata never lies.*\n\n" +
      "Submit the flag after analyzing the location data.",
    flag: flags[2],
  },
  {
    description:
      "**Part 4: Rayane's Blog Secret**\n\n" +
      "🔍 *Challenge Type: Web Exploitation*\n\n" +
      "Rayane's personal blog might contain evidence. A post from April 5, 2:00 AM seems suspicious. " +
      "The visible content looks normal, but there might be hidden data about a USB drive plan " +
      "behind tampered cookies.\n\n" +
      "💡 *Hint: Cookie manipulation can reveal hidden content.*\n\n" +
      "Submit the flag after accessing the hidden blog draft.",
    flag: flags[3],
  },
  {
    description:
      "**Part 5: Sophia's Warning**\n\n" +
      "🔍 *Challenge Type: Cryptography*\n\n" +
      "A 'warning.wav' file was sent to Mohammed at 7:00 AM - just an hour before his death. " +
      "Sophia Reeda, who was suspiciously present near the lab that morning, " +
      "might have witnessed something crucial. The audio file contains a hidden Morse code message.\n\n" +
      "💡 *Hint: Listen carefully between the lines.*\n\n" +
      "Submit the flag after decoding the audio message.",
    flag: flags[4],
  },
];

const eliminationMessages = [
  "🔍 **Professor Jamel Cleared**\n" +
    "A thorough investigation of the admin panel reveals crucial information.\n\n" +
    "📝 **Evidence Found:**\n" +
    "• Security logs show professor was lecturing in Room 302 during murder\n" +
    "• His threatening message (April 4, 11:59 PM) was about academic misconduct\n" +
    "• However, a disturbing email from Sophia to Mohammed emerges:\n" +
    "*'Your research threatens everything we've built. This ends now.'*\n" +
    "What was Sophia's true involvement?",

  "🔍 **Lina Douri Vindicated**\n" +
    "The decrypted script contains unexpected revelations.\n\n" +
    "📝 **Evidence Found:**\n" +
    "• Recovered chat log proves her innocence:\n" +
    "• April 2: Angry message about Phobos Labs\n" +
    "• April 3: *'Let's resolve this professionally. Meeting tomorrow?'*\n" +
    "• April 4: Full reconciliation with Mohammed\n" +
    "Lina has documented proof she was at a tech conference in Oran.",

  '🔍 **Ali "The Coder" Confirmed Innocent**\n' +
    "Airport records are conclusive.\n\n" +
    "📝 **Evidence Found:**\n" +
    "• Multiple CCTV footage timestamps\n" +
    "• Constantine Airport security logs\n" +
    "• Hotel check-in records (April 4-5)\n" +
    "• Phone tower triangulation data\n" +
    "Ali was 300km away - physically impossible to be involved.",

  "⚠️ **Rayane's Blog Uncovered**\n" +
    "The blog reveals a calculated plan.\n\n" +
    "📝 **Key Evidence Found:**\n" +
    "• Blog draft dated April 5, 2:00 AM\n" +
    '• Direct quote: "USB plan ready. Tonight everything changes."\n' +
    "• Multiple posts about financial struggles\n" +
    "But with Sophia's earlier threat, could this be misdirection?",

  "❗ **Morse Code Decoded**\n" +
    "The audio message reveals a shocking truth...\n\n" +
    "📝 **Critical Evidence:**\n" +
    '• Decoded Message: "RAYANE DID IT"\n' +
    "• Timestamp: April 5, 7:00 AM\n" +
    "• Additional Data Found: GitHub Repository Link\n" +
    '"https://github.com/USTHB-SecResearch/project-2025"\n\n' +
    "**🔍 Next Step:**\n" +
    "The repository might contain the final evidence we need.\n" +
    "Check the git history, particularly around April 4-5...\n" +
    "💡 *Find the hidden flag in the commit history to reveal the full truth...*",

  "**The Final Piece Falls Into Place**\n" +
    "The GitHub repository reveals everything...\n\n" +
    "**Rayane's Confession:**\n" +
    "*'Fine, I admit it. The smoking habit got expensive...\n" +
    "I tried selling research data to cover costs, but Mohammed found out.\n" +
    "That USB had everything - the backdoor, buyer conversations...\n" +
    "When he threatened to expose me at morning presentation, I snapped.\n" +
    "Sophia? She was trying to warn him about my data theft all along.'*",
];

client.once("ready", () => {
  console.log(` Logged in as ${client.user?.tag}`);
  client.user?.setActivity("with Discord.js");

  const guild = client.guilds.cache.get(serverId);
  if (!guild) return console.error(" Guild not found!");

  const channel = guild.channels.cache.get(channelId);
  if (!channel?.isTextBased())
    return console.error(" Channel not found or not text-based.");

  channel
    .send("Hello, this is my message!")
    .then(() => console.log("📨 Message sent successfully!"))
    .catch((err) => console.error(" Error sending message:", err));
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.content === "/iamready") {
    const user = message.author;
    try {
      await user.send(
        `Welcome Detective ${user.username}! You are now ready to solve the case!`
      );
      await user.send("Give us your full name, please.");
      awaitingName.add(user.id);
      console.log(` Awaiting full name from user ${user.username}`);
    } catch (err) {
      console.error(" Failed to DM user:", err);
      if (message.channel.type !== ChannelType.DM) {
        message.reply(
          " I couldn't DM you. Please make sure your DMs are open."
        );
      }
    }
    return;
  }
  if (message.channel.type === ChannelType.DM) {
    if (awaitingName.has(message.author.id)) {
      const fullName = message.content.trim();
      const user = message.author;

      try {
        await message.channel.send(
          `Thank you, ${fullName}! The investigation will begin shortly.`
        );
        awaitingName.delete(user.id);
        startInvestigation(user, fullName);
      } catch (err) {
        console.error(" Error responding in DM:", err);
      }
    } else if (message.content.toLowerCase() === "start") {
      const progress = userProgress.get(message.author.id) || 0;
      if (progress < challengeParts.length) {
        message.channel.send(challengeParts[progress].description);
      }
    } else {
      const progress = userProgress.get(message.author.id);
      if (progress !== undefined) {
        const isLastChallenge = progress === challengeParts.length - 1;
        const isGitHubFlag = message.content.trim() === flags[flags.length - 1];

        if (isLastChallenge && message.content.trim() === flags[progress]) {
          // Show Morse code results and GitHub challenge
          message.channel.send(
            "🎉 **Correct!**\n\n" +
              eliminationMessages[progress] +
              "\n\n" +
              "**Final Step:**\n" +
              "Examine the GitHub repository to find the last piece of evidence..."
          );
        } else if (isLastChallenge && isGitHubFlag) {
          // Show confession and case summary
          message.channel.send(
            eliminationMessages[eliminationMessages.length - 1]
          );
          message.channel.send(
            "🎉 **Case Solved: The Silent Byte**\n\n" +
              "**Case Summary:**\n" +
              "The investigation led us through a maze of deception:\n" +
              "• Initial suspicion of Sophia proved to be a clever misdirection\n" +
              "• The GitHub repository revealed the true story\n" +
              "• Rayane's desperation for quick money led to betrayal\n\n" +
              "**The Evidence Chain:**\n" +
              "1. Sophia's 'threatening' email was actually a warning\n" +
              "2. Rayane's blog exposed his financial desperation\n" +
              "3. The final GitHub commit proved his attempt to steal research\n\n" +
              "**Aftermath:**\n" +
              "What started as a simple need for cigarette money escalated into corporate espionage and murder. " +
              "Rayane Colliche chose a dark path, while Sophia tried to prevent the tragedy.\n\n" +
              "**Justice has been served.** 🔨\n" +
              "*The Silent Byte reminds us how small vices can lead to devastating choices.*"
          );
        } else if (
          !isLastChallenge &&
          message.content.trim() === challengeParts[progress].flag
        ) {
          // Regular challenge completion
          const newProgress = progress + 1;
          userProgress.set(message.author.id, newProgress);
          message.channel.send(
            "🎉 **Correct!**\n\n" +
              eliminationMessages[progress] +
              "\n\n" +
              "Moving to the next part...\n\n" +
              challengeParts[newProgress].description
          );
        } else {
          message.channel.send("❌ That's not the correct flag. Try again!");
        }
      }
    }
  }
});

function startInvestigation(user: User, fullName: string) {
  userProgress.set(user.id, 0);
  user
    .send(
      `🔍 **The Silent Byte** - A Cybersecurity Murder Mystery\n\n` +
        `Welcome, Detective ${fullName}.\n\n` +
        `A tragic event has occurred at USTHB University in Algiers. Mohammed Bensalem, a promising Cybersecurity Master's student, ` +
        `has been found dead in Salle 404. The scene shows signs of a carefully planned crime:\n\n` +
        `• Time of Death: April 5, 2025, ~8:00 AM\n` +
        `• Key Evidence: Missing laptop, suspicious USB drive, deleted Telegram chats\n` +
        `• Five suspects, each with their own motives and secrets\n\n` +
        `Your task is to investigate each suspect through a series of technical challenges. ` +
        `Each solution will bring you closer to uncovering the truth.\n\n` +
        `Type **start** to begin your investigation.`
    )
    .catch((err) => console.error("Couldn't send story:", err));
}

client.login(token).catch((err) => {
  console.error("Error logging in:", err);
});
