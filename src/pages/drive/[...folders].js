/*
 * This file will be mapped to /drive/parent, /drive/parent/child,
 * /drive/parent/child/grand-child and so on.
 */

import { useRouter } from "next/router";

export default function DrivePage() {
  const router = useRouter();

  /*
   * If you visit /drive/parent/child/grand-child then you will get:
   * { folders: ['parent', 'child', 'grand-child’] }
   * It is helpful to create URLs like /posts/2022/03/31/my-post-page.
   * For that, you can create component named [...paths].js inside pages/posts
   * then use first index for year, second for month, third for day
   * and last one for slug. And access vial router.query.
   */
  console.log(router.query);

  return <div>Drive Page</div>;
}
