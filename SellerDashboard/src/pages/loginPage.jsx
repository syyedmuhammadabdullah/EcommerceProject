import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CheckBox, Input, loginSeller,  } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { UAParser } from 'ua-parser-js';
import {toast} from "react-toastify"
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const parser = new UAParser();
  const result = parser.getResult();
  const string=`Browser ${result.browser.name} build ${result.browser.major} Version ${result.browser.version} OS ${result.os.name} version ${result.os.version}`

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, seller, error } = useSelector(
    (state) => state.seller
  );


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginSeller({ email, password,device:string }));
  if(seller) {
  navigate("/dashboard");
  }
};
  return (
    <>
      <div
        className="  h-screen flex items-center justify-center bg-background-layout"
      >
        <form
          onSubmit={handleSubmit}
          method="post"
          className="rounded-md w-[328px] sm:w-[480px] py-lg px-p-smx h-[400px] sm:p-xxl sm:h-[510px] flex flex-col gap-base sm:gap-xxl bg-white"
        >
          <div className="content flex items-center flex-col">
            <div className="profile w-[64px] h-[64px] rounded-full bg-icon-default grid place-items-center text-white text-xxl">
              <UserOutlined />
            </div>
            <h3>Welcome Back</h3>
            <p>Login to your account</p>
          </div>

          <div className="formarea flex flex-col gap-base sm:gap-lg">
            <Input
              icon={<UserOutlined />}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              icon={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              passwordIcon={
                showPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOutlined onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
            <div className="flex justify-between">
              <CheckBox
                onChange={(e) => setIsChecked(e.target.checked)}
                isChecked={isChecked}
                children="Remember me"
                className="text-base"
              />
              <Button
                onClick={() => console.log(email, password)}
                className="text-primary-base"
                children="Forget password?"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary-base text-white text-md hover:bg-primary-hover cursor-pointer p-2 rounded-sm"
              children={"Login"}
            />
            <div>
              <span className="text-base">Don't have an account?</span> &nbsp;
              <Link to="/register">
                <Button className="text-primary-base" children="Register" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
