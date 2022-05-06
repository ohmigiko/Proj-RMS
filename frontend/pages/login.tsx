import axios from "axios";
import Button from "components/buttons/Button";
import axiosInstance from "helpers/axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { setUser } from "redux/actions/userAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const baseUrl = process.env.BACKEND_URL;

  const parseJWT = (token: string) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const login = () => {
    localStorage.clear();
    let token = null;
    const credentials = {
      id: username,
    };
    setDisable(true);
    axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then((res) => {
        const userData = parseJWT(res.data.access_token);
        token = res.data.access_token;
        console.log('userData',userData)
        console.log('userData',token)
        if (token !== null && token !== undefined) {
          localStorage.setItem("token", token);
          dispatch(setUser(userData));
          setLoginError(null);
          if(userData.role === "admin") router.push("/admin/user");
          if(userData.role === "waiter") router.push("/dine-in/tables");
          if(userData.role === "chef") router.push("/cooking-station");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("response");
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log("request");
          console.log(err.request);
        } else {
          console.log("message");
          console.log("err", err.message);
        }
        setLoginError(err);
        setDisable(false);
      });
  };

  return (
    <div className="px-20">
      <div>
        <form className="mt-28">
          <div>
            <label
              className="block text-gray-700 text-md mb-2"
              htmlFor="username"
            >
              รหัสผู้ใช้งาน
            </label>
            <input
              className=" w-full py-2 px-3 text-gray-700 mb-3"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {loginError && (
            <p className="texd-sm text-red-400">
              * กรุณาใส่ <span className="font-bold">ชื่อผู้ใช้</span>{" "}
              ให้ถูกต้อง
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <button
              className={
                "bg-red-500 text-white py-4 px-4 rounded-lg shadow-md w-full " +
                (disable ? "opacity-70" : null)
              }
              type="button"
              onClick={login}
              disabled={disable}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
