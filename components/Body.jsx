import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../src/utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../src/utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL + "profile",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    }
    
    catch(err){
      navigate("/login");
      console.error(err)
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
