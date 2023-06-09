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
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const session = useSession();

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
          {session.status === "authenticated" && (
            <>
              <li>
                <Link href={`/profile/${session.data.user.username}`}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={() => signOut({ redirect: false })}>
                  Signout
                </button>
              </li>
            </>
          )}
          {session.status === "unauthenticated" && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
