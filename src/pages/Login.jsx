import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(
    "text-center text-red-600 font-semibold hidden"
  );
  const [errorMessage, setErrorMessage] = useState(
    "An error ocurred, please check the fields"
  );

  const handleClickLogin = (event) => {
    event.preventDefault();
    localStorage.removeItem("token")

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status == 400) {
          setErrorMessage("The email or password are incorrect, please check");
          setErrorText("text-center text-red-600 font-semibold");
        }

        return response.json()
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      })
      .catch((e) => setErrorText("text-center text-red-600 font-semibold"));
  };

  return (
    <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-3 lg:px-4">
      <div className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-md shadow-xl">
        <h2 className="text-3xl text-center text-black font-semibold">
          Sign in to your account
        </h2>
        <input
          type="text"
          className="w-full p-2 rounded-md border-2 border-gray-200"
          placeholder="Email addres"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="w-full p-2 rounded-md border-2 border-gray-200"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          onClick={handleClickLogin}
          className="w-full bg-blue-600 text-white p-2 rounded-md text-lg hover:bg-blue-700"
        >
          Sign in
        </button>
        <p className="text-sm underline text-blue-500 text-center mt-0 hover:text-blue-700">
          <Link to="/register">Don't have an account yet? Register</Link>
        </p>
        <p className={errorText}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Login;
