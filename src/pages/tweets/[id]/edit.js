// This page will be mapped to /tweets/1/edit, /tweets/2/edit, etc.

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getTweetFromIdAPI } from "@/pages/api/tweets/[id]";

export default function EditTweetPage() {
  return <div>Edit Tweet Page</div>;
}

export async function getServerSideProps(context) {
  const [tweet, session] = await Promise.all([
    getTweetFromIdAPI(context.params.id),
    getServerSession(context.req, context.res, authOptions),
  ]);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=/tweets/${context.params.id}/edit`,
      },
    };
  }

  return { props: {} };
}
