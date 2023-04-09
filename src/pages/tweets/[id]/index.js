import { getTweetsFromIdAPI } from "@/pages/api/tweets/[id]";
import Head from "next/head";

export default function SingleTweetPage(props) {
  const title = `Thapa Technical Twitter - Tweet from ${props.tweet.author}`;

  return (
    <div>
      <Head>
        {/*  Always create variable like this to use, otherwise you will get an error. */}
        <title>{title}</title>
      </Head>
      <h1>{props.tweet.tweet}</h1>
      <p>
        {props.tweet.author} -{" "}
        {new Date(props.tweet.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  /*
   * We learned, how to use getServerSideProps for static routes, but what about dynamic routes?
   * Don't worry, it's not complicated as getStaticProps since we can just access the URL
   * or params value from context.params.
   *
   *  If you go to /tweets/1/?filter=true then you will see that context.params will be
   * { id: "1" } and context.query will be { filter: "true", id: "1" }.
   * Which means context.params only contains dynamic route params and context.query contains
   * both dynamic route params and route queries.
   */
  const tweet = (await getTweetsFromIdAPI(context.params.id)).toObject();
  tweet._id = tweet._id.toString();
  tweet.createdAt = tweet.createdAt.toString();
  tweet.updatedAt = tweet.updatedAt.toString();

  return { props: { tweet } };
}
