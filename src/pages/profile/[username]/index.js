// This page will be mapped to /profile/userId

import { getUserByUsernameAPI } from "@/pages/api/profile/[username]";
import { getTweetsAPI } from "@/pages/api/tweets";
import { TweetCard } from "@/components/TweetCard";
import { useEffect, useState } from "react";

export default function SingleUserProfilePage(props) {
  const [tweets, setTweets] = useState(props.tweets);

  async function fetchNewTweets() {
    const res = await fetch(`/api/tweets?userId=${props.user._id}`);
    const data = await res.json();
    setTweets(data);
  }

  useEffect(() => {
    setTweets(props.tweets);
  }, [props.tweets]);

  console.log("Hello");

  return (
    <div>
      <h1>
        {props.user.fullName} @{props.user.username}
      </h1>

      <h2>Tweets</h2>

      <div>
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet._id}>
              <TweetCard tweet={tweet} onTweetDeleted={fetchNewTweets} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// export async function getStaticPaths() {
//   return { paths: [], fallback: "blocking" };
// }

export async function getServerSideProps(context) {
  let user = await getUserByUsernameAPI(context.params.username);

  if (!user) {
    return {
      notFound: true,
    };
  }

  user = user.toObject();
  user._id = user._id.toString();
  user.createdAt = user.createdAt.toString();
  user.updatedAt = user.updatedAt.toString();

  const tweetsResult = await getTweetsAPI({
    author: user._id,
  });
  const tweets = tweetsResult.map((doc) => {
    const tweet = doc.toObject();
    tweet._id = tweet._id.toString();
    tweet.createdAt = tweet.createdAt.toString();
    tweet.updatedAt = tweet.updatedAt.toString();
    tweet.author._id = tweet.author._id.toString();

    return tweet;
  });

  console.log(tweets);

  return {
    props: { user, tweets },
    // revalidate: 1000,
  };
}
