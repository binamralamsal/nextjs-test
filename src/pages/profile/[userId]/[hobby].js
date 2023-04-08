// This file will be mapped to /profile/1/javascript, /profile/2/javascript, etc.

import { useRouter } from "next/router";

export default function SingleUserHobby() {
  const router = useRouter();

  /*
   * { userId: 'userId', hobby: 'hobbyName’ }
   * As you can see, both userId and hobbyName is in router.query
   * as this file is part of userId too. So, you should never create
   * two or more nested files/folders with same name as it will create confusions.
   */
  console.log(router.query);

  return <div>Single User Hobby Page</div>;
}
