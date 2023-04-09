export default function SingleTweetPage(props) {
  console.log(props.post);

  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
    </div>
  );
}

/*
 * We discussed how we can use getStaticProps in static paths but what about
 * dynamic paths? How can we get access to the id from the URL? We already discussed
 * that we can't gain access to request object, it's params and not even URL since
 * getStaticProps only runs during build time? Well, there is a solution for that. If
 * we can't gain access to id from dynamic path then we can still generate static pages
 * of all the ids that we have.
 *
 * getStaticPaths is used to define all the paths that we want to generate static pages for.
 * It will generate for every path, so be careful about not to provide too many paths because
 * that's going to slow down the build process.
 */

/*
 * What's the flow of it?
 * - First getStaticPaths runs during build time, then Next.js will use the paths returned by getStaticPaths
 *   and will pass the params to getStaticProps to build for every of those paths. Both of these functions
 *   will run during build time.
 */
export async function getStaticPaths() {
  /*
   * Paths should be array containing objects having params with an object.
   * id key inside params object is required here because our dynamic path is /tweets/[id].
   * The value of id or any other key must be string here. If you have different name for dynamic path,
   * then you will have to use that. For example, if our path is /tweets/[tweetId] then you will have
   * to include { params: { tweetId: "1" } }. If you have multiple dynamic paths then you have to include
   * all of those. If you pass any other values to params then getStaticPaths will just ignore it.
   */
  const paths = [
    { params: { id: "1", junk: "Hello" } },
    { params: { id: "2", junk: "Hello" } },
    { params: { id: "3", junk: "Hello" } },
    { params: { id: "4", junk: "Hello" } },
    { params: { id: "5", junk: "Hello" } },
  ];
  /*
   * For now, we are specifying all paths manually, that might be fine for few paths but not for paths
   * stored in database, we will discuss about tackling this issue later.
   */

  /*
   * getStaticPaths must return paths and fallback value. We will discuss fallback later.
   */
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  /*
   * If you visit /tweets/1 then you will see { id: '1' } as context.params.
   * You will realize that, junk passed from getStaticPaths is ignored by Next.js because
   * that's not really required.
   */
  console.log(context.params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  ); // This code is fetching posts from jsonplaceholder with id that we got.

  const post = await res.json();
  return { props: { post } };
}
