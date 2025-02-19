"use client";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";

export default function Login() {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.settings);
  const { setItem } = useLocalStorage("userData");
  const router = useRouter();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      console.log("userData:", userData);

      // Send JSON data (application/json)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message, ...userDataToBeStored } = res.data;
      setItem(userDataToBeStored);
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
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
          {t("words.login")}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
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

          <button
            type="submit"
            className={`w-full duration-150 max-xs:text-base xs:text-base sm:text-lg lg:text-xl ${
              mode === "light"
                ? "bg-light-secondary hover:text-light-text text-dark-text"
                : "bg-dark-secondary hover:text-dark-text text-light-text"
            } p-2 rounded`}
          >
            {t("words.login")}
          </button>
        </form>
        <p className="max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm mt-1 flex gap-x-1 px-2">
          {t("sentences.dontHaveAnAccount")}
          <Link
            href="/register"
            className={`underline ${
              mode === "light" ? "text-light-primary" : "text-dark-primary"
            }`}
          >
            {t("sentences.clickHere")}
          </Link>
        </p>
      </div>
    </div>
  );
}
