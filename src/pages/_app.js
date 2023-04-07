// You can add any global CSS in app.js like this.
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/*
 * Did you notice, that we are importing from "@/"?
 * Well, this is happening because of jsconfig.json paths.
 * If you are using typescript then it should be inside tsconfig.json.
 * Any folders inside src is mapped with @/ which means you can import
 * directly from root using @/. This is helpful when you are inside deep
 * path, and you want to import component from root src.
 */

/*
 * App component is used by Next.js for page initialization.
 * You can create custom layout inside _app.js.
 * You can also keep a state which remains when navigating between pages.
 * You can inject additional data into pages.
 */

/*
 * Here, Component refers to any page file. For now, we only have index.js
 * Next.js internally passes the page file as "Component" prop to this App component
 * pageProps is the props that are passed through getStaticProps or getServerSideProps
 * // TODO: We will discuss that in the future...
 */
export default function App({ Component, pageProps }) {
  const secretMessage = "Subscribe to Thapa Technical!";

  return (
    <>
      <Navbar />
      {/*  If you pass any extra props to this Component then you can access using props in page component. */}
      <Component {...pageProps} message={secretMessage} />
      <Footer />
    </>
  );
}
