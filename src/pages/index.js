import Link from "next/link";

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
   */
  const res = await fetch("http://localhost:3000/api/tweets", {});

  const tweets = await res.json();

  return {
    props: {
      tweets,
    },
  };
}
