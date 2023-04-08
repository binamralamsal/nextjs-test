// This page will be mapped to /tweets/1, /tweets/2, etc.

import { useRouter } from "next/router";

export default function SingleTweetPage() {
  // This is one of the special hooks provided by Next.js
  const router = useRouter();

  /*
   * route.query consists all the data from dynamic URL and also query params.
   * If you go to /tweets/1 then you will get { id: "1" }
   * If you go to /tweets/1?filter=true then you will get { id: "1", filter: "true" }
   */
  console.log(router.query);
  // router.pathname is just going to be /tweets/[id]
  console.log(router.pathname);
  /*
   * When a page is loaded in Next.js, router may not be immediately ready,
   * so you can use router.isReady to know when you can access values of router.query
   * You might have already noticed that router.query is empty initially
   * then it changes to actual value in console. It's because Next.js
   * has to perform hydration to actually make the website dynamic
   * and that's why router takes a bit to load, the time taken is negligible to user
   * but you will still see it in console.
   */
  console.log(router.isReady);

  return <div>Single Tweet Page {router.query.id}</div>;
}
