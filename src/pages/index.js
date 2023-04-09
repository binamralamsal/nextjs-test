import Link from "next/link";
import { getTweetsAPI } from "@/pages/api/tweets";

export default function Home(props) {
  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        {props.tweets.map((t) => (
          <li key={t.id}>
            <small>
              {t.author} - {new Date(t.createdAt).toLocaleDateString()}
            </small>
            <h2>
              <Link href={`/tweets/${t.id}`}>{t.tweet}</Link>
            </h2>
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
