import React, { useState } from "react";
import Header from "../Components/Header";
import signupImageUrl from "../Pictures/signup.jpg";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticateUser = () => {
    // authentication logic here
  };

  return (
    <div>
            <Header imageUrl={signupImageUrl} />

      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={authenticateUser}>Login</button>
    </div>
  );
};

export default LoginPage;
