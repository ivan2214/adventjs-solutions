import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const CHALLENGES_FILE = path.join(process.cwd(), "lib", "challenges.json");
const BASE_URL = "https://adventjs.dev/es";

interface Challenge {
  day: number;
  title: string;
  emoji: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  solved: boolean;
  solution?: string;
  descriptions: string[];
  image?: string;
}

async function getChallengesFromFile(): Promise<Challenge[]> {
  try {
    const content = await fs.readFile(CHALLENGES_FILE, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error("Error reading challenges from file:", e);
    return [];
  }
}

async function saveChallengesToFile(challenges: Challenge[]) {
  await fs.writeFile(
    CHALLENGES_FILE,
    JSON.stringify(challenges, null, 2),
    "utf-8",
  );
}

async function fetchChallengeDetails(day: number) {
  const url = `${BASE_URL}/challenges/2025/${day}`;
  console.log(`Fetching details for day ${day} from ${url}...`);

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    let titleText = $("h2").first().text().trim();
    if (!titleText.includes(`Reto #${day}`)) {
      const header = $(`*:contains("Reto #${day}")`).last();
      if (header.length) titleText = header.text().trim();
    }

    const titleMatch = titleText.match(/Reto #\d+:\s+(.)\s+(.*)/);
    let emoji = "🎁";
    let title = titleText;

    if (titleMatch) {
      emoji = titleMatch[1];
      title = titleMatch[2];
    }

    const descriptions: string[] = [];

    const descriptionDiv = $('div[id*="challenge-description"]');

    // Tomar todos los hijos hasta <h2 id="ejemplos">
    descriptionDiv.children().each((_, el) => {
      const tag = ($(el).prop("tagName") ?? "").toLowerCase();
      const id = $(el).attr("id");

      // Cortar cuando llegue a "Ejemplos"
      if (tag === "h2" && id === "ejemplos") return false;

      // Solo guardar <p>, <ul>, <ol> como texto plano
      if (["p", "ul", "ol"].includes(tag)) {
        descriptions.push($(el).text().trim());
      }
    });

    let difficulty: "Fácil" | "Medio" | "Difícil" = "Fácil";
    const textContent = $.root().text();
    if (textContent.includes("Fácil")) difficulty = "Fácil";
    else if (textContent.includes("Medio")) difficulty = "Medio";
    else if (textContent.includes("Difícil")) difficulty = "Difícil";
    else if (textContent.includes("Hard")) difficulty = "Difícil";

    return {
      title,
      emoji,
      difficulty,
      descriptions,
    };
  } catch (e) {
    console.error(`Failed to fetch details for day ${day}`, e);
    return null;
  }
}

async function main() {
  console.log("Starting challenge update...");
  const currentChallenges = await getChallengesFromFile();
  console.log(`Loaded ${currentChallenges.length} challenges.`);

  // Fetch main page to get available days and images
  const res = await fetch(`${BASE_URL}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const containerChallenge = $('main[class*="grid-challenges"]');
  // Buscar todos los retos
  const links = containerChallenge.find("a");

  const availableDays = new Set<number>();
  const dayImages = new Map<number, string>(); // solo 1 imagen por día

  links.each((_, el) => {
    const link = $(el);
    const href = link.attr("href") ?? "";

    console.log("href", href);

    // Detectar si está disponible (href == /challenges/2025/{day})
    const match = href.match(/\/challenges\/2025\/(\d+)/);
    console.log("match", match);
    if (!match) return; // está como /es# → no disponible

    const day = parseInt(match[1], 10);
    console.log("day", day);

    availableDays.add(day);

    // Solo la imagen del <picture> (el background)
    const backgroundImg = link.find("picture img").attr("src") ?? null;
    console.log("backgroundImg", backgroundImg);

    if (backgroundImg) {
      dayImages.set(day, `${BASE_URL}${backgroundImg}`);
    }
  });

  console.log(`Found available days: ${Array.from(availableDays).join(", ")}`);

  let updated = false;

  for (const day of availableDays) {
    console.log("day", day);
    const existingIndex = currentChallenges.findIndex((c) => c.day === day);
    const existing: Challenge | undefined = currentChallenges[existingIndex];
    console.log("existing", existing);

    // Check if we need to update image
    const newImage = dayImages.get(day);
    if (existing && newImage && existing.image !== newImage) {
      console.log(`Updating image for day ${day}...`);
      currentChallenges[existingIndex].image = newImage;
      updated = true;
    }

    // Check if we need to update details (if missing description)
    if (existing?.descriptions?.length) {
      continue;
    }

    const details = await fetchChallengeDetails(day);

    if (details) {
      if (existing) {
        console.log(`Updating details for day ${day}...`);
        currentChallenges[existingIndex] = {
          ...existing,
          ...details,
          image: newImage || existing.image,
        };
      } else {
        console.log(`Adding new day ${day}...`);
        currentChallenges.push({
          day,
          ...details,
          solved: false,
          image: newImage,
        });
      }
      updated = true;
    }
  }

  currentChallenges.sort((a, b) => a.day - b.day);

  if (updated) {
    await saveChallengesToFile(currentChallenges);
    console.log("Challenges updated successfully.");
  } else {
    console.log("No updates needed.");
  }
}

main().catch(console.error);
