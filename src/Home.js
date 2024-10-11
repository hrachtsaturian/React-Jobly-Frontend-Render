import React, { useContext } from "react";
import Welcome from "./Welcome";
import Default from "./Default";
import Context from "./Context";


function Home() {
  const { currentUser } = useContext(Context);
  // if the user is logged in - hide buttons and display 'Welcome Back!'
  return <div style={{ marginTop: '100px' }}>{currentUser ? <Welcome /> : <Default />}</div>;
}

export default Home;
