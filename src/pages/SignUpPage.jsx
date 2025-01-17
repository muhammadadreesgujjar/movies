import React, { useState, useEffect } from "react";
import "../styles/signIn.css";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { setItem, getItem } from "../helpers/utils/localStorage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  useEffect(() => {
    // const getuserMail = getItem("userMail");
    // if (!getuserMail) {
    //   navigate("/signIn");
    //   return;
    // }
    // const users = getItem("users");
    // if (!users) {
    //   navigate("/signIn");
    //   return;
    // }
    // const findUser = users.find((item) => item.email == getuserMail);
    // if (!findUser) {
    //   navigate("/signIn");
    //   return;
    // }
    // navigate("/");
  }, []);
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });

    if (e.target.name == "username" && e.target.value.length == 0) {
      setError({
        username: "UserName is required.",
        email: null,
        password: null,
        confirmPassword: null,
      });
      return;
    }

    if (e.target.name == "username" && e.target.value.length > 0) {
      setError({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      });
      return;
    }
    if (e.target.name == "email" && e.target.value.length == 0) {
      setError({
        username: null,
        email: "Email is required.",
        password: null,
        confirmPassword: null,
      });
      return;
    }

    if (
      e.target.name == "email" &&
      !e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError({
        username: null,
        email: "Email is not valid.",
        password: null,
        confirmPassword: null,
      });
      return;
    }

    if (
      e.target.name == "email" &&
      e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      });
      return;
    }

    if (e.target.name == "password" && e.target.value.length == 0) {
      setError({
        username: null,
        email: null,
        password: "Password is required.",
        confirmPassword: null,
      });
      return;
    }
    if (e.target.name == "password" && e.target.value.length > 5) {
      setError({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      });
      return;
    }

    if (
      e.target.name == "password" &&
      e.target.value.length > 0 &&
      e.target.value.length < 5
    ) {
      setError({
        username: null,
        email: null,
        password: "Password length should less than 5.",
        confirmPassword: null,
      });
      return;
    }

    if (
      e.target.name == "confirmPassword" &&
      e.target.value != inputValue.password
    ) {
      setError({
        username: null,
        email: null,
        password: null,
        confirmPassword: "Confirm Password does not match with Password.",
      });
      return;
    }
    if (
      e.target.name == "confirmPassword" &&
      e.target.value == inputValue.password
    ) {
      setError({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      });
      return;
    }
  };

  const handleSignUp = () => {
    const valid = Validate(inputValue, setError);
    if (valid) {
      const users = getItem("users");
      if (!users) {
        setItem("users", [inputValue]);
        navigate("/signin");
        return;
      }

      const findUser = users.find((item) => item.email == inputValue.email);
      if (findUser) {
        alert("Already user exist with this email");
        return;
      }
      const updatedUsers = [...users, inputValue];
      setItem("users", updatedUsers);
      navigate("/signin");
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
          onClick={() => handleSignUp()}
        >
          Sign Up
        </button>
        <p className="text-xs font-semibold text-center">
          Already have an account?
          <a
            href="/signIn"
            className="ml-1 
            decoration-blue-500 text-blue-600"
          >
            SignIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

function Validate(inputValue, setError) {
  let isValid = true;

  if (inputValue.username == "") {
    setError((prev) => ({
      ...prev,
      username: "UserName is required.",
    }));
    isValid = false;
  }

  if (inputValue.email == "") {
    setError((prev) => ({
      ...prev,
      email: "Email is required.",
    }));
    isValid = false;
  } else if (
    !inputValue.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    setError((prev) => ({
      ...prev,
      email: "Email is not valid.",
    }));
    isValid = false;
  }

  if (inputValue.password == "") {
    setError((prev) => ({
      ...prev,
      password: "Password is required.",
    }));
    isValid = false;
  }

  if (inputValue.confirmPassword == "") {
    setError((prev) => ({
      ...prev,
      confirmPassword: "Confirm Password is required.",
    }));
    isValid = false;
  } else if (inputValue.password != inputValue.confirmPassword) {
    setError((prev) => ({
      ...prev,
      confirmPassword: "Confirm Password does not match with Password",
    }));
    isValid = false;
  }

  return isValid;
}
