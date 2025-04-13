import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Custom hook for login logic
  const { loading, login } = useLogin();

  // Handle form submission then we will create login hook
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-75">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Log In - <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username here"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password here"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Signup Link */}
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          {/* Submit Button */}
          <button
            className="btn btn-block btn-sm mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;