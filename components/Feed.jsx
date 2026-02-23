import { useSelector } from "react-redux";
import { BASE_URL } from "../src/utils/constants";
import axios from "axios";
import { addFeed } from "../src/utils/feedSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      try {
        // Only fetch if feed is empty
        if (Array.isArray(feed) && feed.length > 0) return;

        const res = await axios.get(BASE_URL + "user/feed", {
          withCredentials: true,
        });

        // If your backend returns { data: users }
        // use: dispatch(addFeed(res.data.data));
        dispatch(addFeed(res.data));
      } catch (err) {
        console.error(err?.response?.data || err.message);
      }
    };

    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ run once on mount only

  return (
    <div className="flex justify-center my-10">
      {Array.isArray(feed) && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="text-xl text-center">No more profiles to show!</p>
      )}
    </div>
  );
};

export default Feed;