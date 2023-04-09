import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { Inter } from "next/font/google";

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
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
