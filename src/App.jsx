import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "../components/Body";
import Profile from "../components/Profile";
import LogIn from "../components/LogIn";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LogIn/>} />
            <Route index element={<Feed />} />
            <Route path="connections" element={<Connections/>} />
            <Route path="requests" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
