"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export default function Register() {
  const { t } = useTranslation();
  const isSmallerThan360 = useMediaQuery({ query: "(max-width: 360px)" });
  const isSmallerThan480 = useMediaQuery({ query: "(max-width: 480px)" });
  const isSmallerThan640 = useMediaQuery({ query: "(max-width: 640px)" });
  const [profileImage, setProfileImage] = useState(null);
  const { mode } = useSelector((state) => state.settings);

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch, // Watch function to compare the passwords
  } = useForm();

  const password = watch("password"); // Watch the password field
  const cPassword = watch("cPassword"); // Watch the confirm password field

const handleFileChange = (e) => {
  const file = e.target.files[0]; // Get the first file
  if (file) {
    setProfileImage(file); // Store the file
    setValue("profileImage", file); // Update value in React Hook Form
    console.log("File selected.", file);
  } else {
    console.log("No file selected.");
  }
};
  const handleFormSubmit = (data) => {
    console.log(data); // Log data if all fields are valid
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
          {/* First Name */}
          <div className="flex flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="firstName"
            >
              {t("words.firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder={t("words.firstName")}
              {...register("firstName", { required: true })}
              className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                errors.firstName
                  ? mode === "light"
                    ? "border-light-red"
                    : "border-dark-red"
                  : mode === "light"
                  ? "border-light-primary focus:border-light-secondary caret-light-primary"
                  : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
              }`}
            />
            {errors.firstName && (
              <p
                className={`${
                  mode === "light" ? "text-light-red" : "text-dark-red"
                } text-sm`}
              >
                {t("errors.firstName")}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-1 flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="lastName"
            >
              {t("words.lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder={t("words.lastName")}
              {...register("lastName", { required: true })}
              className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                errors.lastName
                  ? mode === "light"
                    ? "border-light-red"
                    : "border-dark-red"
                  : mode === "light"
                  ? "border-light-primary focus:border-light-secondary caret-light-primary"
                  : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
              }`}
            />
            {errors.lastName && (
              <p
                className={`${
                  mode === "light" ? "text-light-red" : "text-dark-red"
                } text-sm`}
              >
                {t("errors.lastName")}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="email"
            >
              {t("words.email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("words.email")}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                errors.email
                  ? mode === "light"
                    ? "border-light-red"
                    : "border-dark-red"
                  : mode === "light"
                  ? "border-light-primary focus:border-light-secondary caret-light-primary"
                  : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
              }`}
            />
            {errors.email && (
              <p
                className={`${
                  mode === "light" ? "text-light-red" : "text-dark-red"
                } text-sm`}
              >
                {t("errors.email")}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="password"
            >
              {t("words.password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder={t("words.password")}
              {...register("password", { required: true })}
              className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                errors.password
                  ? mode === "light"
                    ? "border-light-red"
                    : "border-dark-red"
                  : mode === "light"
                  ? "border-light-primary focus:border-light-secondary caret-light-primary"
                  : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
              }`}
            />
            {errors.password && (
              <p
                className={`${
                  mode === "light" ? "text-light-red" : "text-dark-red"
                } text-sm`}
              >
                {t("errors.password")}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-y-1">
            <label
              className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
              htmlFor="cPassword"
            >
              {t("words.cPassword")}
            </label>
            <input
              type="password"
              name="cPassword"
              id="cPassword"
              placeholder={t("words.cPassword")}
              {...register("cPassword", {
                required: true,
                validate: (value) =>
                  value === password || t("errors.passwordMismatch"),
              })}
              className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
                errors.cPassword
                  ? mode === "light"
                    ? "border-light-red"
                    : "border-dark-red"
                  : mode === "light"
                  ? "border-light-primary focus:border-light-secondary caret-light-primary"
                  : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
              }`}
            />
            {errors.cPassword && (
              <p
                className={`${
                  mode === "light" ? "text-light-red" : "text-dark-red"
                } text-sm`}
              >
                {errors.cPassword?.message}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-y-1">
            <p className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
              {t("sentences.uploadProfileImage")}
            </p>
            <div
              className={`cursor-pointer w-full flex justify-center items-center py-2 px-2 rounded-md duration-150 ${
                mode === "light"
                  ? "bg-light-primary hover:text-light-text text-dark-text"
                  : "bg-dark-primary hover:text-dark-text text-light-text"
              }`}
            >
              <label
                htmlFor="profileImage"
                className="w-full flex justify-center"
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
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profileImage", { required: false })}
                onChange={handleFileChange} // Handle file change
              />
            </div>
            {profileImage  && (
              <p className="w-full text-center max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
                {profileImage.name}
              </p>
            )}
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
