import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(
    "text-center text-red-600 font-semibold hidden"
  );
  const [errorMessage, setErrorMessage] = useState(
    "An error ocurred, please validate the fields"
  );

  const handleCreateAccount = (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username || !email || !password) {
      setErrorText("text-center text-red-600 font-semibold");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorText("text-center text-red-600 font-semibold");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status == 400) {
          setErrorMessage("The user already exists");
          setErrorText("text-center text-red-600 font-semibold");
        } else if (response.status == 201) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((e) => setErrorText("text-center text-red-600 font-semibold"));
  };

  return (
    <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-3 lg:px-4">
      <div className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-md shadow-xl">
        <h2 className="text-3xl text-center text-black font-semibold">
          Create an account
        </h2>
        <input
          type="text"
          className="w-full p-2 rounded-md border-2 border-gray-200"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          className="w-full p-2 rounded-md border-2 border-gray-200"
          placeholder="Email addres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="w-full p-2 rounded-md border-2 border-gray-200"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          onClick={handleCreateAccount}
          className="w-full bg-blue-600 text-white p-2 rounded-md text-lg hover:bg-blue-700"
        >
          Create account
        </button>
        <p className={errorText}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Register;
