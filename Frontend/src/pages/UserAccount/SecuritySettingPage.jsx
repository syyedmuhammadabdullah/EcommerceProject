import React, { useState } from "react";
import { Button, Input } from "../../index";
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined, PhoneOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const SecuritySettingPage = () => {
  const [state, setState] = useState({
    editPassword: false,
    editEmail: false,
    editPhone: false,
    editSecurityQuestion: false,
    editRecoveryEmail: false,
    showPassword: false,
    currentPassword: "",
    newPassword: "",
    email: "",
    recoveryEmail: "",
    phoneNumber: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const toggleEditField = (field) => {
    setState((prevState) => ({
      ...prevState,
      editPassword: false,
      editEmail: false,
      editPhone: false,
      editSecurityQuestion: false,
      editRecoveryEmail: false,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="flex justify-center">
      <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="title">
          <h3>Security Settings</h3>
        </div>

        <div className="content grid gap-md">
          {/* Password Fields */}
          <div className={`item flex ${state.editPassword ? "justify-stretch gap-md flex-wrap" : "justify-between"} items-center py-p-smx border`}>
            <Input
              icon={<LockOutlined />}
              passwordIcon={
                state.showPassword ? <EyeOutlined onClick={() => setState({ ...state, showPassword: false })} /> : <EyeInvisibleOutlined onClick={() => setState({ ...state, showPassword: true })} />
              }
              type={state.showPassword ? "text" : "password"}
              placeholder="Current Password"
              name="currentPassword"
              id="currentPassword"
              value={state.currentPassword}
              onChange={handleInputChange}
              divClassName={` ${state.editPassword ? "block" : "hidden"}`}
            />
            <Input
              icon={<LockOutlined />}
              passwordIcon={
                state.showPassword ? <EyeOutlined onClick={() => setState({ ...state, showPassword: false })} /> : <EyeInvisibleOutlined onClick={() => setState({ ...state, showPassword: true })} />
              }
              type={state.showPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
              value={state.newPassword}
              onChange={handleInputChange}
              divClassName={` ${state.editPassword ? "block" : "hidden"}`}
            />
            <Button children="Change" className={`bg-primary-base ${state.editPassword ? "block" : "hidden"} p-p-sm rounded-md text-white`} onClick={() => toggleEditField('editPassword')} />
            <div className={`content ${!state.editPassword ? "block" : "hidden"}`}>
              <h5>Change Password</h5>
              <p>Enter your current password and new password.</p>
            </div>
            <div className={`button ${!state.editPassword ? "block" : "hidden"}`}>
              <Button
                children="Edit"
                onClick={() => toggleEditField('editPassword')}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className={`item flex ${state.editEmail ? "justify-stretch gap-md flex-wrap" : "justify-between"} items-center py-p-smx border`}>
            <Input
              icon={<MailOutlined />}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={state.email}
              onChange={handleInputChange}
              divClassName={` ${state.editEmail ? "block" : "hidden"}`}
            />
            <Button children="Change" className={`bg-primary-base ${state.editEmail ? "block" : "hidden"} p-p-sm rounded-md text-white`} onClick={() => toggleEditField('editEmail')} />
            <div className={`content ${!state.editEmail ? "block" : "hidden"}`}>
              <h5>Change Email</h5>
              <p>Update your email address.</p>
            </div>
            <div className={`button ${!state.editEmail ? "block" : "hidden"}`}>
              <Button
                children="Edit"
                onClick={() => toggleEditField('editEmail')}
              />
            </div>
          </div>

          {/* Recovery Email Field */}
          <div className={`item flex ${state.editRecoveryEmail ? "justify-stretch gap-md flex-wrap" : "justify-between"} items-center py-p-smx border`}>
            <Input
              icon={<MailOutlined />}
              type="email"
              placeholder="Recovery Email"
              name="recoveryEmail"
              id="recoveryEmail"
              value={state.recoveryEmail}
              onChange={handleInputChange}
              divClassName={` ${state.editRecoveryEmail ? "block" : "hidden"}`}
            />
            <Button children="Change" className={`bg-primary-base ${state.editRecoveryEmail ? "block" : "hidden"} p-p-sm rounded-md text-white`} onClick={() => toggleEditField('editRecoveryEmail')} />
            <div className={`content ${!state.editRecoveryEmail ? "block" : "hidden"}`}>
              <h5>Change Recovery Email</h5>
              <p>Update your recovery email address.</p>
            </div>
            <div className={`button ${!state.editRecoveryEmail ? "block" : "hidden"}`}>
              <Button
                children="Edit"
                onClick={() => toggleEditField('editRecoveryEmail')}
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className={`item flex ${state.editPhone ? "justify-stretch gap-md flex-wrap" : "justify-between"} items-center py-p-smx border`}>
            <Input
              icon={<PhoneOutlined />}
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              value={state.phoneNumber}
              onChange={handleInputChange}
              divClassName={` ${state.editPhone ? "block" : "hidden"}`}
            />
            <Button children="Change" className={`bg-primary-base ${state.editPhone ? "block" : "hidden"} p-p-sm rounded-md text-white`} onClick={() => toggleEditField('editPhone')} />
            <div className={`content ${!state.editPhone ? "block" : "hidden"}`}>
              <h5>Change Phone Number</h5>
              <p>Update your phone number.</p>
            </div>
            <div className={`button ${!state.editPhone ? "block" : "hidden"}`}>
              <Button
                children="Edit"
                onClick={() => toggleEditField('editPhone')}
              />
            </div>
          </div>

          {/* Security Question Field */}
          <div className={`item flex ${state.editSecurityQuestion ? "justify-stretch gap-md flex-wrap" : "justify-between"} items-center py-p-smx border`}>
            <Input
              icon={<QuestionCircleOutlined />}
              type="text"
              placeholder="Security Question"
              name="securityQuestion"
              id="securityQuestion"
              value={state.securityQuestion}
              onChange={handleInputChange}
              divClassName={` ${state.editSecurityQuestion ? "block" : "hidden"}`}
            />
            <Input
              icon={<LockOutlined />}
              type={state.showPassword ? "text" : "password"}
              placeholder="Security Answer"
              name="securityAnswer"
              id="securityAnswer"
              value={state.securityAnswer}
              onChange={handleInputChange}
              divClassName={` ${state.editSecurityQuestion ? "block" : "hidden"}`}
            />
            <Button children="Change" className={`bg-primary-base ${state.editSecurityQuestion ? "block" : "hidden"} p-p-sm rounded-md text-white`} onClick={() => toggleEditField('editSecurityQuestion')} />
            <div className={`content ${!state.editSecurityQuestion ? "block" : "hidden"}`}>
              <h5>Change Security Question</h5>
              <p>Update your security question and answer.</p>
            </div>
            <div className={`button ${!state.editSecurityQuestion ? "block" : "hidden"}`}>
              <Button
                children="Edit"
                onClick={() => toggleEditField('editSecurityQuestion')}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecuritySettingPage;
