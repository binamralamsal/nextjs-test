export default function SingleTweetPage(props) {
  console.log(props.post);

  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
    </div>
  );
}

export async function getStaticPaths() {
  /*
   * We learned how we can specify different paths for our pages. But what if our data is stored in
   * database or different locations? Well, since it runs only in server, you can run any server
   * side code which means you can retrieve data from an API or database then return different
   * paths that you want. You can either return all paths or just return a few paths with fallback
   * set to "blocking" or true.
   *
   * Alternative way is to return empty paths with fallback set to blocking. This way, no pages will
   * be generated during build time but when a user visits a page, Next.js will generate the page
   * on demand and cache for future use, which means if user visits the same page again, it will
   * be served from cache.
   */

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts = await res.json();
  const paths = posts.map((p) => ({
    params: { id: p.id.toString() },
  })); // This is just generating multiple paths from posts

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  console.log(context.params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  ); // This code is fetching posts from jsonplaceholder with id that we got.

  const post = await res.json();
  return { props: { post } };
}
