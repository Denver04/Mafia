import "dotenv/config";
import { Client } from "discord.js";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is Active👍`);
});

const randomImage = async (tag: string) => {
  const res = await fetch(`${process.env.URL}${tag}`);
  const data = await res.json();
  try {
    return "Isko dekh k hila ab " + data.images[0].url;
  } catch {
    return "Acha tag daal na laude.";
  }
};

client.on("messageCreate", (message) => {
  const typedMessage = message.content;
  const beforeTag = typedMessage.split(" ")[0];
  const tag = typedMessage.split(" ")[1];
  if (beforeTag === "!need") {
    const getImage = async (tags: string) => {
      const images = await randomImage(tags);
      return images;
    };
    const imageUrl = getImage(tag);

    imageUrl.then((url) => {
      message.reply(`${url}`);
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "!MainGareeb") {
    message.reply(
      "Type !need <tag> to get a random image of the tag you want. Tag should be from ero, ass, hentai, milf, oral, paizuri, and ecchi."
    );
  }
});

client.login(process.env.TOKEN);
