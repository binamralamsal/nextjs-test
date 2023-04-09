import path from "path";
import fs from "fs/promises";

/*
 * Routing for API routes work same as routing for pages. You can create a folder or file
 * or paths inside pages/api folder depending on your need.
 *
 * You need to return a default function from this API routes. This only runs on server
 * which means you can run any node.js code, connect to database, etc.
 *
 * You can get, set cookies, read req.body, get query, params, etc.
 *
 * Here, we are using fs module to get data from tweets.json and providing all the tweets that we have.
 */
export default async function handler(req, res) {
  // We only want to send data in GET requests.
  if (req.method === "GET") {
    const tweets = await getTweetsAPI();

    res.status(200).json(tweets);
  }
}

export async function getTweetsAPI() {
  const filePath = path.join(process.cwd(), "src/data/tweets.json");

  const data = await fs.readFile(filePath);
  const tweets = JSON.parse(data.toString());

  // Sort by date
  return tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
