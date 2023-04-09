import Link from "next/link";

export default function Home(props) {
  /*
   * You will see values here coming from getStaticProps. If you remove pageProps
   * from _app.js then you will see that props will be empty.
   *
   * You will realize that this will also be logged in console of the Next.js development
   * server, that's because Next.js runs any code insider your page for generating HTML.
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
 * getStaticProps runs on build time (i.e. when you run `npm run build` command.)
 * Your website is built automatically when you are in development mode. As it only
 * runs during build time, you won't get new data when you refresh the page. You will have to
 * run `npm run build` command again to get new data.
 *
 * How does this work?
 * - First it runs on build time and fetches data from API.
 * - Then it passes the data to _app.js.
 * - Do you remember that we discussed that pageProps of _app.js is the data received
 *   received through getStaticProps, getServerSideProps and so on? If you go to _app.js
 *   then you will see it, which means if you remove the pageProps passed to the <Component />
 *   then you will get empty data inside the Home component.
 * - _app.js passes the pageProps to <Component />
 *
 * To build the website, run `npm run build` command. (Don't forget to stop the development server
 * before running this command). After building, "/" is assigned as "●" which means we are using
 * SSG or Static Site Generation on this page. You can see .next folder to see generated website.
 *
 * In development, Next.js will continuously build the website, so you might get illusion of
 * dynamic data but that's not the case with production build. Production build won't change
 * unless you build the project again.
 *
 * Don't forget to read: https://nextjs.org/docs/basic-features/data-fetching/get-static-props#when-should-i-use-getstaticprops
 * before deciding if this is what you should use.
 *
 * getStaticProps can include any server code which means you can use any server side
 * libraries, node.js builtin modules, external packages, connect to database, and so on.
 *
 * Since, getStaticProps only runs during build time and not in each request, you can't
 * access request object, query parameters, HTTP headers, etc. Code or packages that is being
 * used in only getStaticProps will never be sent to client.
 */
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts = await res.json();

  // Return an object containing props having value that you want in your page component.
  return {
    props: {
      posts,
    },
  };
}
