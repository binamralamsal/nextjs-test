import { useRouter } from "next/router";

export default function SingleTweetPage(props) {
  const router = useRouter();

  /*
   * When fallback passed from getStaticPaths is set to true, Next.js will serve a "fallback" version.
   * When router.isFallback is true, props.post will be undefined. So, we need to check if fallback
   * version is being served or not. If it is, we will show loading indicator. Otherwise, we will show
   * the page.
   *
   * It's not needed when you are using fallback: "blocking"
   */
  if (router.isFallback) return <div>Loading</div>;

  console.log(props.post);

  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
    { params: { id: "4" } },
    { params: { id: "5" } },
  ];

  /*
   * We discussed, how we can specify paths for getStaticProps. But, what if we have
   * 1000s of posts and we don't want to specify all of them? We can specify paths for
   * popular posts then allow Next.js to generate pages for other posts on demand.
   *
   * fallback value accepts two values, boolean or "blocking". Default behavior is false.
   * By default or when fallback is false, any paths not returned by getStaticPaths will result
   * in 404 error. This means, /tweets/6 will result in 404 error because it's not specified inside
   * paths.
   *
   * When fallback is set to true, Next.js will serve a "fallback" version fo the page on first request.
   * This fallback version is just a blank page with loading indicator. Then, Next.js will generate
   * the full version of the page in the background and serve it to the user. This means, /tweets/6
   * will result in a blank page with loading indicator, and then it will show the page.
   * Next.js will just run getStaticProps in background to get data for the specified id in background.
   * This data will be cached for future use, which means if you visit /tweets/6 again, you won't see
   * loading indicator. Build the project to see this in action.
   *
   * When fallback is set to "blocking", Next.js will wait for getStaticProps to finish before
   * serving the page.
   */
  return { paths, fallback: "blocking" };

  /*
   * When path is set to empty [] with fallback: "blocking", this page will essentially behave similar to
   * getServerSideProps which we will discuss later. The only difference is that, once it has generated page
   * for a specific path, it will cache and reuse that later on which is not the case with getServerSideProps.
   */
  // return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context) {
  console.log(context.params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  ); // This code is fetching posts from jsonplaceholder with id that we got.

  const post = await res.json();
  return { props: { post } };
}
