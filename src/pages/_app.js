import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { Inter } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
});

/*
 * Here, Component refers to any page file. For now, we only have index.js
 * Next.js internally passes the page file as "Component" prop to this App component
 * pageProps is the props that are passed through getStaticProps or getServerSideProps
 */
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={inter.className}>
        {/*
         * Head is one of the component exported by Next.js. You can add any title, meta tags, etc.
         * Don't import scripts or styles using this though.
         * Head of _app.js is only for the whole app, not for individual pages.
         * If there is title inside <Head> of individual pages then it will replace the one of _app.js.
         */}
        <Head>
          <title>Thapa Technical Twitter</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </SessionProvider>
  );
}
