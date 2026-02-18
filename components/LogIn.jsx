import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../src/utils/userSlice";
import { BASE_URL } from "../src/utils/constants";

const LogIn = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(true);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        {withCredentials : true}
      );
      dispatch(addUser(res.data));
      return navigate("/");
    }catch(err){
      setError(err?.response?.data || "something went wrong!");
      console.error(err);
    }
  }

  const handleSignUp = async () => {
    try{
      const res = await axios.post(
        BASE_URL + "signUp",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {withCredentials : true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center py-5">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">LogIn</h2>
            <div>
              {!isLoggedIn && <><fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                  type="text"
                  value={firstName} 
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />  
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                  type="text"
                  value={lastName} 
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />  
              </fieldset>
            </>}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input 
                  type="text"
                  value={emailId} 
                  className="input"
                  onChange={(e) => setEmailId(e.target.value)}
                />  
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input 
                  type="password" 
                  value={password} 
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </fieldset>
            </div>
            <div className="card-actions flex flex-col items-center gap-4">
              <p className="text-red-500">{error}</p>
              <button className="btn btn-primary" onClick={isLoggedIn ? handleLogin : handleSignUp} >
                {isLoggedIn ? "LogIn" : "signUp"}
              </button>
            </div>
             <p className="m-auto cursor-pointer py-2"onClick={() => setIsLoggedIn((value) => !value)}>
              {
                isLoggedIn
                ? "New user? SignUp here"
                : "Existing user? LogIn here"
              }
             </p>
          </div>
        </div>
      </div>
    </>
  )
};

export default LogIn;
