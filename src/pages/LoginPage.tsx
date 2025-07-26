import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  //FOR MOCK API
  //const [message, setMessage] = useState("");
  //   const handleLogin = async (username: string, password: string) => {
  //     // This will call our backend in the future
  //     console.log("Attempting login with:", username, password);
  //     // TODO: Replace with API call
  //   };
  //   return (
  //     <div>
  //       <h1>Welcome</h1>
  //       <LoginForm onLogin={handleLogin} />
  //     </div>
  //   );
  // const handleLogin = async (username: string, password: string) => {
  //   const success = await loginUser(username, password);
  //   if (success) {
  //     setMessage("✅ Login successful!");
  //   } else {
  //     setMessage("❌ Invalid username or password.");
  //   }
  // };
  // return (
  //   <div>
  //     <h1>Welcome</h1>
  //     <LoginForm onLogin={handleLogin} />
  //     {message && <p>{message}</p>}
  //   </div>
  // );
  //
  //
  //
  //

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const result = await loginUser(username, password);
    console.log(result); // ✅ check what you get

    // if (result === true) {
    //   setMessage("Login Success");
    //   setSuccess(true);
    //   localStorage.setItem("token", generateToken);
    //   console.log(token);
    // } else {
    //   setMessage("Invalid Credentials");
    //   setSuccess(false);
    // }

    if (result.success && result.token) {
      setMessage("Login Success");
      setSuccess(true);

      // ✅ Save token and user
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      //navigate("/");
      navigate("/dashboard", { replace: true });
    } else {
      setMessage("Invalid Credentials");
      setSuccess(false);
    }
    // const handleLogin = async (username: string, password: string) => {
    //   const result = await loginUser(username, password);

    //   if (result.success) {
    //     setMessage("Login Success");
    //     setSuccess(true);
    //   } else {
    //     setMessage("Invalid Credentials");
    //     setSuccess(false);
    //   }
    // };

    // setMessage(result.message);
    // setSuccess(result.success);
  };
  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {message && (
        <p style={{ color: success ? "green" : "red", marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </div>
  );
}
