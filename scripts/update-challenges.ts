import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const CHALLENGES_FILE = path.join(process.cwd(), "lib", "challenges.json");
const BASE_URL = "https://adventjs.dev/es";

interface Challenge {
  day: number;
  title: string;
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

    const title = titleText;

    const descriptions: string[] = [];
    const descriptionDiv = $('div[id*="challenge-description"]');

    descriptionDiv.children().each((_, el) => {
      const tag = ($(el).prop("tagName") ?? "").toLowerCase();
      const id = $(el).attr("id");

      if (tag === "h2" && id === "ejemplos") return false;
      if (["p", "ul", "ol"].includes(tag)) {
        descriptions.push($(el).text().trim());
      }
    });

    let difficulty: "Fácil" | "Medio" | "Difícil" = "Fácil";
    const textContent = $.root().text();
    if (textContent.includes("Medio")) difficulty = "Medio";
    else if (textContent.includes("Difícil")) difficulty = "Difícil";

    return { title, difficulty, descriptions };
  } catch (e) {
    console.error(`Failed to fetch details for day ${day}`, e);
    return null;
  }
}

async function main() {
  console.log("Starting challenge update...");
  const currentChallenges = await getChallengesFromFile();
  console.log(`Loaded ${currentChallenges.length} challenges.`);

  const res = await fetch(`${BASE_URL}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const containerChallenge = $('main[class*="grid-challenges"]');
  const links = containerChallenge.find("a");

  const allDaysFound = new Set<number>();
  const availableDays = new Set<number>();
  const dayImages = new Map<number, string>();

  links.each((_, el) => {
    const link = $(el);
    const href = link.attr("href") ?? "";

    // Día del span interno
    const dayText = link.find("span.font-mono").first().text().trim();
    const day = parseInt(dayText, 10);
    if (!day) return;

    allDaysFound.add(day);

    const img = link.find("picture img").attr("src") ?? null;
    if (img) dayImages.set(day, `${BASE_URL}${img}`);

    // Si el href coincide con día disponible
    const match = href.match(/\/challenges\/2025\/(\d+)/);
    if (match) availableDays.add(day);
  });

  console.log("Found days:", Array.from(allDaysFound));
  console.log("Available days:", Array.from(availableDays));

  let updated = false;

  for (const day of allDaysFound) {
    const existingIndex = currentChallenges.findIndex((c) => c.day === day);
    const existing = currentChallenges[existingIndex];
    const image = dayImages.get(day);

    // Si no existe, crear entrada base (incluso bloqueados)
    if (!existing) {
      currentChallenges.push({
        day,
        title: "",
        difficulty: "Fácil",
        descriptions: [],
        solved: false,
        image,
      });
      updated = true;
    }

    // Si está disponible, completar datos
    if (availableDays.has(day)) {
      const details = await fetchChallengeDetails(day);
      if (details) {
        if (existingIndex >= 0) {
          currentChallenges[existingIndex] = {
            ...currentChallenges[existingIndex],
            ...details,
            image,
          };
        } else {
          currentChallenges.push({
            day,
            ...details,
            solved: false,
            image,
          });
        }
        updated = true;
      }
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
