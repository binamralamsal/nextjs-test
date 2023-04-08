import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();

  function handleOpenTweets() {
    // This will redirect users to /tweets/
    router.push("/tweets");

    /*
     * router.replace is simlar to router.push, but it will
     * prevent adding a new URL entry to history stack.
     * But, what does that mean? Use router.push() then click on that button
     * then you will realize that you can press back button of your browser
     * but instead if you use router.replace() then you will realize that
     * you won't go back to previous page as router.replace() replaces your history stack.
     *
     * router.replace("/tweets");
     */

    /*
     * As expected, it will redirect back to previous page.
     *
     * router.back();
     */

    /*
     * As expected, it will reload the page
     *
     * router.reload();
     */
  }
  return (
    <>
      {/*
       * Although, we are redirecting users via button to showcase in this example
       * please never ever do this. Always use link tag for this.
       */}
      <button onClick={handleOpenTweets}>Open Tweets</button>
      {/* You can then gain access to this secret message using props because that's what you passed through _app.js */}
      <p>{props.message}</p>
      <div>Page Content</div>
    </>
  );
}
