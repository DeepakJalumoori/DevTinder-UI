import axios from "axios";
import { BASE_URL } from "../src/utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../src/utils/feedSlice";


const UserCard = ({user}) => {
  if (!user) return null;
  
  const dispatch = useDispatch();
  const {_id ,firstName , lastName , photoUrl, age, gender, about} = user;

  const handleSendRequest = async (status,userId) => {
    try{
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        {withCredentials: true}
      );
      dispatch(removeUserFromFeed(userId));
    }catch(err){
      console.error(err);
    }
  }
 
  
  return (
    <div className="card bg-base-200 w-85 h-105 shadow-sm">
      <figure className="h-64">
        <img
          src={photoUrl || "https://via.placeholder.com/400x400?text=No+Photo"}
          alt="profile" 
          className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p><b>{gender},{age} </b></p>  
        <p>{about}</p>
        
        <div className="card-actions justify-center">
          <button className="btn btn-success text-white" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
          <button className="btn btn-error text-white"  onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
  )
};

export default UserCard;