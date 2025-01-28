import { useState } from "react";
import "../../styles/signIn.css";
import InputField from "../../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorageHandler from "../../hooks/useLocalStorageHandler";
import useFetchAPI from "../../hooks/useFetchAPI";
import {
  validateEmail,
  validatePassword,
} from "../../helpers/utils/onChangeValidation";
import { setItem } from "../../helpers/utils/localStorage";

const SignIn = () => {
  const navigate = useNavigate();
  const [data, loading, error0, fecthCall] = useFetchAPI("/auth/sign-in");
  useLocalStorageHandler();
  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });

    if (e.target.name == "email") {
      const validEmail = validateEmail(e.target.value);
      setError((prev) => {
        return {
          ...prev,
          email: validEmail,
        };
      });
    }

    if (e.target.name == "password") {
      const validPassword = validatePassword(e.target.value);
      setError((prev) => {
        return {
          ...prev,
          password: validPassword,
        };
      });
    }
  };

  const handleSignIn = async () => {
    const res = await fecthCall("POST", {
      email: inputValue.email,
      password: inputValue.password,
    });

    if (res) {
      setItem("token", res.token);
      if (res.role == "user") {
        navigate("/");
        return;
      }
      navigate("/admin");
      return;
    }
    setError({
      email: null,
      password: error0.message,
    });
  };

  return (
    <div className="bg-[url('/src/assets/images/bg-img.jpg')] bg-bottom bg-cover bg-no-repeat h-screen flex justify-center items-center text-white">
      <div className="signInBox flex flex-col justify-between">
        <h1 className="text-5xl font-semibold text-center">Sign in</h1>
        <InputField
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onchange={handlechange}
          err={error.email}
        />
        <InputField
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onchange={handlechange}
          err={error.password}
        />
        <div className="flex justify-center gap-1">
          <input type="checkbox" className="checkBox unchecked:bg-gray-200" />
          <p className="text-center checkBoxText leading-6">Remember me</p>
        </div>
        <button
          type="button"
          className="logInButton rounded-lg font-semibold w-full"
          onClick={() => handleSignIn()}
        >
          Login
        </button>
        <p className="text-xs font-semibold text-center">
          Do not have an account?
          <Link
            to="/signUp"
            className="ml-1 
            decoration-blue-500 text-blue-600"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
