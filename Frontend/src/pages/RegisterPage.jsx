import { useEffect, useState } from "react";

import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  CheckBox,
  registerUser,
  getAllAddress,
  getUserCart,
  getWishlist,
  getOrders,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { UAParser } from "ua-parser-js";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const parser = new UAParser();
  const result = parser.getResult();
  const string=`Browser ${result.browser.name} build ${result.browser.major} Version ${result.browser.version} OS ${result.os.name} version ${result.os.version}`

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email,
        password,
        fullName,
        username,
        device: string,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated || user) {
      dispatch(getAllAddress());
      dispatch(getUserCart({ userId: user?._id }));
      dispatch(getWishlist());
      dispatch(getOrders());
      const product = JSON.parse(localStorage.getItem("pendingProduct"));
      if (product) {
        dispatch(
          addItemToCart({
            productId: product._id,
            quantity: 1,
            unitPrice: product?.discountPrice
              ? product?.discountPrice
              : product.unitPrice,
            userId: user._id,
          })
        );
        localStorage.removeItem("pendingProduct");
        navigate("/shoping-cart");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="  h-screen flex items-center justify-center bg-background-layout">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="rounded-md w-[328px] sm:w-[480px] py-lg px-p-smx  sm:p-xl  flex flex-col gap-base sm:gap-xxl bg-white"
        >
          <div className="content flex items-center flex-col">
            <div className="profile w-[64px] h-[64px] rounded-full bg-icon-default grid place-items-center text-white text-xxl">
              <UserOutlined />
            </div>
            <h3>Welcome</h3>
            <p>Create your account to get started</p>
          </div>

          <div className="formarea flex flex-col gap-base sm:gap-lg">
            <Input
              icon={<UserOutlined />}
              type="text"
              name="fullName"
              placeholder="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="fullName"
            />
            <Input
              icon={<UserOutlined />}
              type="text"
              name="username"
              placeholder="Usename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <Input
              icon={<MailOutlined />}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              icon={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
              onClick={() => console.log(email, password)}
              className="bg-primary-base text-white text-md hover:bg-primary-hover cursor-pointer p-2 rounded-sm"
              children={
                loading ? (
                  <div className="flex gap-xxs items-center justify-center">
                    <TailSpin color="white" height={20} width={20} />{" "}
                    Registering
                  </div>
                ) : (
                  "Register"
                )
              }
            />
            <div>
              <span className="text-base">Already have an account?</span> &nbsp;
              <Link to="/login">
                <Button
                  onClick={() => console.log(email, password)}
                  className="text-primary-base"
                  children="Login"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
