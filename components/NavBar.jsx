import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../src/utils/constants";
import axios from "axios";
import { removeUser } from "../src/utils/userSlice";

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
   try{
    await axios.post(BASE_URL + "logout", {}, {withCredentials: true});
    dispatch(removeUser());
    navigate("/login");
   }catch(err){
    console.error("Logout error:", err);
   }
  };
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">🔥DevTinder</Link>
        </div>
        <div className="flex gap-2">
          
        {user && (
          <>
            <div className="form-control flex-1 px-4 py-3 text-center">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar py-4">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to={"/Connections"}>Connections</Link> </li>
              <li><Link to={"/Requests"}>Requests</Link> </li>
              <li><a onClick={handleLogOut}>Logout</a></li>
            </ul>
            </div>
          </> 
        )}
        </div>
      </div>
    </>
  )
};

export default NavBar;