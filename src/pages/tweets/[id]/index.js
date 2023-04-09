export default function SingleTweetPage(props) {
  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
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
  console.log(context.params, context.query);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  ); // This code is fetching posts from jsonplaceholder with id that we got.

  const post = await res.json();
  return { props: { post } };
}
