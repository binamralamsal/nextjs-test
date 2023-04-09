import Link from "next/link";

export default function Home(props) {
  /*
   * You will see values here coming from getServerSideProps. If you remove pageProps
   * from _app.js then you will see that props will be empty.
   *
   * You will realize that this will also be logged in console of the Next.js development
   * server, that's because Next.js runs any code inside your page for generating HTML.
   */
  console.log(props);

  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        {props.posts.map((p) => (
          <li key={p.id}>
            <h2>
              <Link href={`/tweets/${p.id}`}>{p.title}</Link>
            </h2>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * getServerSideProps runs on every requests sent by the users which means you will always
 * get updated value since it runs for every requests sent by the users.
 *
 * How does this work?
 * - When user requests to visit this page, Next.js runs getServerSideProps.
 * - Then it passes the data to _app.js.
 * - Do you remember that we discussed that pageProps of _app.js is the data received
 *   received through getStaticProps, getServerSideProps and so on? If you go to _app.js
 *   then you will see it, which means if you remove the pageProps passed to the <Component />
 *   then you will get empty data inside the Home component.
 * - _app.js passes the pageProps to <Component />
 *
 * Don't forget to read: hhttps://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-should-i-use-getserversideprops
 * before deciding if this is what you should use.
 *
 * getServerSideProps can include any server code which means you can use any server side
 * libraries, node.js builtin modules, external packages, connect to database, and so on.
 *
 * Since, getServerSideProps runs during each request, you can
 * access request object, query parameters, HTTP headers, etc. Code or packages that is being
 * used in only getServerSideProps will never be sent to client.
 */
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts = await res.json();

  // Return an object containing props having value that you want in your page component.
  return {
    props: {
      posts,
    },
  };
}
