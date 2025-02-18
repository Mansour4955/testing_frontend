"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const isSmallerThan360 = useMediaQuery({ query: "(max-width: 360px)" });
  const isSmallerThan480 = useMediaQuery({ query: "(max-width: 480px)" });
  const isSmallerThan640 = useMediaQuery({ query: "(max-width: 640px)" });
  const { mode } = useSelector((state) => state.settings);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t("errors.required");
    if (!formData.lastName.trim()) newErrors.lastName = t("errors.required");
    if (!formData.email.trim()) {
      newErrors.email = t("errors.required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("errors.invalidEmail");
    }
    if (!formData.password.trim()) newErrors.password = t("errors.required");
    if (!formData.cPassword.trim()) {
      newErrors.cPassword = t("errors.required");
    } else if (formData.password !== formData.cPassword) {
      newErrors.cPassword = t("errors.passwordMismatch");
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let data;
    if (formData.profileImage) {
      data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value);
        }
      });
    } else {
      data = { ...formData };
      delete data.profileImage;
    }
    console.log("Submitting Data:", data);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`mx-4 my-10 p-4 sm480:w-[450px] max-sm480:w-full ${
          mode === "light"
            ? "bg-white text-light-text"
            : "bg-black text-dark-text"
        } rounded-lg shadow`}
      >
        <h2
          className={`${
            mode === "light" ? "text-light-primary" : "text-dark-primary"
          } max-xs:text-base xs:text-base sm:text-lg lg:text-xl font-bold mb-4`}
        >
          {t("words.register")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["firstName", "lastName", "email", "password", "cPassword"].map(
            (field) => (
              <div key={field} className="flex flex-col gap-y-1">
                <label
                  className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
                  htmlFor={field}
                >
                  {t(`words.${field}`)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  id={field}
                  placeholder={t(`words.${field}`)}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                    mode === "light"
                      ? "border-light-primary focus:border-light-secondary caret-light-primary"
                      : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
                  }`}
                />
                {errors[field] && (
                  <span className="text-red-500 text-xs">{errors[field]}</span>
                )}
              </div>
            )
          )}
          <div className="flex flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="file"
            >
              {t("sentences.uploadProfileImage")}
            </label>
            <div
              className={`cursor-pointer w-full flex justify-center items-center py-2 px-2 rounded-md duration-150 ${
                mode === "light"
                  ? "bg-light-primary hover:text-light-text text-dark-text"
                  : "bg-dark-primary hover:text-dark-text text-light-text"
              }`}
            >
              <IoCloudUploadSharp
                size={
                  isSmallerThan360
                    ? 16
                    : isSmallerThan480
                    ? 16
                    : isSmallerThan640
                    ? 20
                    : 22
                }
              />
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full duration-150 max-xs:text-base xs:text-base sm:text-lg lg:text-xl ${
              mode === "light"
                ? "bg-light-secondary hover:text-light-text text-dark-text"
                : "bg-dark-secondary hover:text-dark-text text-light-text"
            } p-2 rounded`}
          >
            {t("words.register")}
          </button>
        </form>
      </div>
    </div>
  );
}
