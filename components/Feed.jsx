import { useSelector} from "react-redux";
import { BASE_URL } from "../src/utils/constants";
import axios from "axios";
import {addFeed} from "../src/utils/feedSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed && feed.length > 0) return;
    try{
      const res = await axios.get(BASE_URL + "user/feed",{withCredentials: true});
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="text-xl text-center">No more profiles to show!</p>
      )}
    </div>
  )
};

export default Feed;