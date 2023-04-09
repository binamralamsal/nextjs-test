import Link from "next/link";
import { getTweetsAPI } from "@/pages/api/tweets";
import { useState } from "react";

export default function Home(props) {
  const [tweet, setTweet] = useState("");
  const [author, setAuthor] = useState("");

  const [tweets, setTweets] = useState(props.tweets);

  async function handleNewTweet(e) {
    e.preventDefault();

    const res = await fetch("/api/tweets/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweet,
        author,
      }),
    });

    const newTweet = await res.json();

    setTweet("");
    setAuthor("");

    // Fix bug where it wasn't updating properly
    setTweets((prev) => [newTweet, ...prev]);
  }

  async function handleDeleteTweet(id) {
    const res = await fetch(`/api/tweets/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);

    setTweets((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h1>Home Page</h1>

      <form onSubmit={handleNewTweet}>
        <input
          type="text"
          placeholder="Tweet"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {tweets.map((t) => (
          <li key={t.id}>
            <small>
              {t.author} - {new Date(t.createdAt).toLocaleDateString()}
            </small>
            <h2>
              <Link href={`/tweets/${t.id}`}>{t.tweet}</Link>
            </h2>

            <button onClick={() => handleDeleteTweet(t.id)}>Delete</button>
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

  const tweets = await getTweetsAPI();

  return {
    props: {
      tweets,
    },
  };
}
