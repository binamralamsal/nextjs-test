/*
 * Pages file should only contain pages, it should not contain any other files.
 * So, we are adding components in separate folders.
 */

/*
 * Link is one of the built-in components provided by Next.js
 * It helps to create links which links to other pages without reloading.
 * You can also add any other external website links here.
 * It is almost same as <a> and rendered HTML is also <a>.
 * If JavaScript is disabled, this link tag will reload the page
 * because JavaScript or hydration process is required for this link
 * to load pages without reloading.
 */
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div>
        <Link href="/">Thapa Technical</Link>
      </div>

      <div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
