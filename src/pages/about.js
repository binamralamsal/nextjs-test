/*
 * This page will be mapped to /about
 * Also, you will realize that Navbar and Footer is part of this page too because it is in _app.js
 */

export default function About(props) {
  return <div>About Page {props.randomNumber}</div>;
}

export async function getStaticProps() {
  /*
   * We discussed that getStaticProps only runs once during build time, when data
   * changes we need to build the whole website again. That doesn't sound like a great
   * idea. What if we want to update the page with new data periodically? Well,
   * you can use Incremental Static Regeneration (ISR) to achieve that.
   * This helps to create or update pages after you've built your site.
   *
   * You can add revalidate key in your object returned by getStaticProps. This key
   * tells Next.js that you want to regenerate the page after some time. For example,
   * if you set revalidate to 10 then Next.js will regenerate the page after 10 seconds.
   *
   * Remember that Next.js will only regenerate the page when there is a request to
   * that page. So, if you set revalidate to 10 then Next.js will regenerate the page
   * after 10 seconds but if there is no request to that page then it won't regenerate
   * the page. getStaticProps will run again after 10 seconds when request is sent.
   *
   * This is how it goes:
   * - Next.js will generate the page at build time.
   * - Before 10 seconds, Next.js will serve the generated page.
   * - After 10 seconds, Next.js won't do anything if request is not being sent to that page.
   * - After 10 seconds, Next.js will regenerate the page if request is being sent to that page.
   * - Next.js will serve the newly generated page for next 10 seconds.
   *
   * Use revalidate value as you want. It depends upon how often the value changes. Build the
   * project to see this in action.
   *
   * Before adding revalidate key, random number never gets changed in production
   * but after adding revalidate key, random number gets changed after 10 seconds.
   *
   * This same feature can also be used with dynamic paths, which means Next.js can re-generate the
   * dynamic path's page after some time. For example, if you have a page with dynamic path
   * /tweets/[id] then you can use revalidate key to re-generate the page after some time.
   */
  const randomNumber = Math.random();

  return {
    props: {
      randomNumber,
    },
    revalidate: 10, // In 10 seconds
  };
}
