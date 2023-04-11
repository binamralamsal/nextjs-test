import Link from "next/link";
import { useSession } from "next-auth/react";

export function TweetCard(props) {
  const session = useSession();

  async function handleDeleteTweet(id) {
    await fetch(`/api/tweets/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (props.onTweetDeleted) props.onTweetDeleted();
  }

  return (
    <div>
      <small>
        <Link href={`/profile/${props.tweet.author.username}`}>
          {props.tweet.author.fullName}
        </Link>{" "}
        - {new Date(props.tweet.createdAt).toLocaleDateString()}
      </small>
      <h2>
        <Link href={`/tweets/${props.tweet._id}`}>{props.tweet.tweet}</Link>
      </h2>

      {session.data?.user?.id === props.tweet.author._id && (
        <>
          <Link href={`/tweets/${props.tweet._id}/edit`}>Edit</Link>{" "}
          <button onClick={() => handleDeleteTweet(props.tweet._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
