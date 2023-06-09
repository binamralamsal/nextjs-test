import Link from "next/link";
import { getTweetsAPI } from "@/pages/api/tweets";
import { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TweetCard } from "@/components/TweetCard";

export default function Home(props) {
  const [tweet, setTweet] = useState("");
  // useSession hook can be used to know if user is logged in or not
  const session = useSession();

  const [tweets, setTweets] = useState(props.tweets);

  async function fetchNewTweets() {
    const res = await fetch("/api/tweets");
    const data = await res.json();
    setTweets(data);
  }

  async function handleNewTweet(e) {
    e.preventDefault();

    await fetch("/api/tweets/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweet,
      }),
      credentials: "include",
    });

    setTweet("");
    fetchNewTweets();
  }

  return (
    <div>
      {/* This title will replace the one of _app.js */}
      <Head>
        <title>Thapa Technical Twitter - Home</title>
      </Head>

      <h1>Home Page</h1>

      {session.status === "authenticated" && (
        <form onSubmit={handleNewTweet}>
          <input
            type="text"
            placeholder="Tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <ul>
        {tweets.map((t) => (
          <li key={t._id}>
            <TweetCard tweet={t} onTweetDeleted={fetchNewTweets} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  /*
   * Here, I am accessing the API that I created and sending that back to the page.
   *
   * Although, we discussed using fetch API previously, you should never ever use fetch
   * API to access data from API routes. Why? Because, when user visits this page, Next.js will
   * run getServerSideProps where we are fetching from our own API. Since, we are fetching from our
   * own API, our server will send request to our own server which is really a bad thing. This just
   * slows down the process, why don't we just run the code to get tweets data? You can just export
   * the logic that gets the data from API routes and use that here directly instead of using fetch.
   */
  // const res = await fetch("http://localhost:3000/api/tweets", {});
  //
  // const tweets = await res.json();

  // https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/pages/index.js#L56
  const [result, session] = await Promise.all([
    getTweetsAPI(),
    getServerSession(context.req, context.res, authOptions),
  ]);
  if (session) session.user.image = null;

  const tweets = result.map((doc) => {
    const tweet = doc.toObject();
    tweet._id = tweet._id.toString();
    tweet.createdAt = tweet.createdAt.toString();
    tweet.updatedAt = tweet.updatedAt.toString();
    tweet.author._id = tweet.author._id.toString();

    return tweet;
  });

  return {
    props: {
      tweets,
      session,
    },
  };
}
