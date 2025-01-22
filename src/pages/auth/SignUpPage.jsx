import React, { useState } from "react";
import "../../styles/signIn.css";
import InputField from "../../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../reducers/usersAuthSlice";
import { signUpValidate } from "../../helpers/utils/formValidations";
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../helpers/utils/onChangeValidation";

const SignUpPage = () => {
  const selectors = useSelector((state) => state.usersAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    permisions: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
  });

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });

    if (e.target.name == "username") {
      const validUserName = validateUserName(e.target.value);
      setError((prev) => {
        return {
          ...prev,
          username: validUserName,
        };
      });
    }

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

    if (e.target.name == "confirmPassword") {
      const validConfirmPassword = validateConfirmPassword(
        e.target.value,
        inputValue.password
      );
      setError((prev) => {
        return {
          ...prev,
          confirmPassword: validConfirmPassword,
        };
      });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const valid = signUpValidate(inputValue, setError);
    if (valid) {
      const findUser = selectors.find((item) => item.email == inputValue.email);
      if (findUser) {
        alert("Already user exist with this email");
        return;
      }
      dispatch(addUser(inputValue));
      navigate("/signin");
      return;
    }
  };

  return (
    <div className="bg-[url('/src/assets/images/bg-img.jpg')] bg-bottom bg-cover bg-no-repeat h-screen flex justify-center  text-white pt-11">
      <div className="signInBox flex flex-col justify-between gap-6">
        <h1 className="text-5xl font-semibold text-center">Sign Up</h1>
        <InputField
          name="username"
          placeholder="User Name"
          value={inputValue.username}
          onchange={handlechange}
          err={error.username}
        />
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
        <InputField
          name="confirmPassword"
          placeholder="Confirm Password"
          value={inputValue.confirmPassword}
          onchange={handlechange}
          err={error.confirmPassword}
        />
        <div className="flex justify-center gap-1">
          <input type="checkbox" className="checkBox unchecked:bg-gray-200" />
          <p className="text-center checkBoxText leading-6">Remember me</p>
        </div>
        <button
          type="button"
          className="logInButton rounded-lg font-semibold w-full p-3"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </button>
        <p className="text-xs font-semibold text-center">
          Already have an account?
          <Link
            to="/signIn"
            className="ml-1
            decoration-blue-500 text-blue-600"
          >
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
