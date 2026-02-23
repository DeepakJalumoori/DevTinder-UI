import axios from "axios";
import { BASE_URL } from "../src/utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../src/utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();
  const { _id, id, firstName, lastName, photoUrl, age, gender, about } = user;
  const userId = _id ?? id;

  const handleSendRequest = async (status, userId) => {
    if (!userId) {
      console.error("Missing user id for request", user);
      return;
    }

    try {
      await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err?.response?.data || err.message);
    } finally {
      // Always move to next profile for smooth UX
      dispatch(removeUserFromFeed(userId));
    }
  };

  return (
    <div className="card bg-base-200 w-85 h-105 shadow-sm">
      <figure className="h-64">
        <img
          src={photoUrl || "https://via.placeholder.com/400x400?text=No+Photo"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {gender && age && (
          <p>
            <b>
              {gender}, {age}
            </b>
          </p>
        )}

        {about && <p>{about}</p>}

        <div className="card-actions justify-center">
          <button
            className="btn btn-success text-white"
            onClick={() => handleSendRequest("interested", userId)}
          >
            Interested
          </button>
          <button
            className="btn btn-error text-white"
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;