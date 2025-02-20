import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function CreateEventForm({
  setCreateEventCount,
  createEventCount,
  mode,
  setShowAllInputs,
}) {
  const [accessType, setAccessType] = useState("public");
  const { t } = useTranslation();

  const { getItem } = useLocalStorage("userData");
  const userData = getItem();

  const sendAccessOfferNotification = async (event) => {
    // Add both the host and all participants to the recipient array
    const accessOnlyToPpl = event.accessOnlyTo.map((user) =>
      user._id ? user._id : user
    );
    const recipient = [...accessOnlyToPpl];
    const reference = {
      referenceId: event._id,
      referenceModel: "Event",
    };

    const data = { recipient, notificationType: "access_offer", reference };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("notification access_offer response: ", res.data);
    } catch (err) {
      console.log("Error posting notification access_offer: ", err.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    // Check if all required fields are filled before submitting
    if (
      !data.description ||
      !data.date ||
      !data.location ||
      !data.maxParticipants ||
      !data.category ||
      !data.access
    ) {
      console.error("All required fields must be filled.");
      return;
    }

    try {
      const eventData = new FormData();

      // Convert the date to UTC before appending
      const utcDate = new Date(data.date).toISOString();

      eventData.append("description", data.description);
      eventData.append("date", utcDate);
      eventData.append("location", data.location);
      eventData.append("maxParticipants", data.maxParticipants);
      eventData.append("category", data.category);
      eventData.append("access", data.access);

      if (data.access === "private" && data.accessOnlyTo.length > 0) {
        const accessOnlyToArray = data.accessOnlyTo
          .split(",")
          .map((id) => id.trim()); // Ensure no spaces

        accessOnlyToArray.forEach((id) => {
          eventData.append("accessOnlyTo[]", id); // Append each ID separately
        });
      }

      if (data.content.length > 0) {
        eventData.append("content", data.content[0]);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`,
        eventData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setCreateEventCount(createEventCount + 1);
      setShowAllInputs(false);
      console.log("Created event: ", res.data);
      if (res.data.access === "private" && res.data.accessOnlyTo.length > 0) {
        sendAccessOfferNotification(res.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  const accessArray = t("access", { returnObjects: true });
  const categoryArray = t("category", { returnObjects: true });
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-1">
        {/* Description */}
        <div className="flex flex-col gap-y-1">
          <label
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
            htmlFor="description"
          >
            {t("words.description")}
          </label>
          <input
            type="text"
            {...register("description", { required: true })}
            className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
              errors.description
                ? mode === "light"
                  ? "border-light-red"
                  : "border-dark-red"
                : mode === "light"
                ? "border-light-primary focus:border-light-secondary caret-light-primary"
                : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
            }`}
          />
          {errors.description && (
            <span className="text-red-500">{t("errors.description")}</span>
          )}
        </div>

        {/* Date */}
        <div className="flex flex-col gap-y-1">
          <label
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
            htmlFor="date"
          >
            {t("words.date")}
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
              errors.date
                ? mode === "light"
                  ? "border-light-red"
                  : "border-dark-red"
                : mode === "light"
                ? "border-light-primary focus:border-light-secondary caret-light-primary"
                : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
            }`}
          />
          {errors.date && (
            <span className="text-red-500">{t("errors.date")}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-y-1">
          <label
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
            htmlFor="location"
          >
            {t("words.location")}
          </label>
          <input
            type="text"
            {...register("location", { required: true })}
            className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
              errors.location
                ? mode === "light"
                  ? "border-light-red"
                  : "border-dark-red"
                : mode === "light"
                ? "border-light-primary focus:border-light-secondary caret-light-primary"
                : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
            }`}
          />
          {errors.location && (
            <span className="text-red-500">{t("errors.location")}</span>
          )}
        </div>

        {/* Max Participants */}
        <div className="flex flex-col gap-y-1">
          <label
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
            htmlFor="maxParticipants"
          >
            {t("words.maxParticipants")}
          </label>
          <input
            type="number"
            {...register("maxParticipants", { required: true, min: 1 })}
            className={`flex-1 p-2 border-2 rounded-md text-light-text outline-none ${
              errors.maxParticipants
                ? mode === "light"
                  ? "border-light-red"
                  : "border-dark-red"
                : mode === "light"
                ? "border-light-primary focus:border-light-secondary caret-light-primary"
                : "border-dark-primary focus:border-dark-secondary caret-dark-primary"
            }`}
          />
          {errors.maxParticipants && (
            <span className="text-red-500">{t("errors.maxParticipants")}</span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-y-1">
          <label
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
            htmlFor="category"
          >
            {t("words.category")}
          </label>
          <select
            {...register("category", { required: true })}
            className="p-2 border-2 rounded-md text-light-text outline-none"
          >
            {categoryArray.map((cat, index) => (
              <option key={index} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">{t("errors.category")}</span>
          )}
        </div>

        {/* Access */}
        <div className="flex flex-col gap-y-1">
          <label className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
            {t("words.access")}
          </label>
          <select
            {...register("access", { required: t("errors.access") })}
            onChange={(e) => setAccessType(e.target.value)}
            className="p-2 border-2 rounded-md text-light-text outline-none"
          >
            {accessArray.map((acc, index) => (
              <option key={index} value={acc.value}>
                {acc.label}
              </option>
            ))}
          </select>
          {errors.access && (
            <span className="text-red-500">{t("errors.access")}</span>
          )}
        </div>

        {/* Access Only To (When Private) */}
        {accessType === "private" && (
          <div className="flex flex-col gap-y-1">
            <label className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
              {t("words.accessOnlyTo")}
            </label>
            <input
              type="text"
              placeholder={t("placeholders.accessOnlyToPlaceholder")}
              {...register("accessOnlyTo", {
                required: accessType === "private",
                validate: (value) =>
                  accessType === "private" && value.trim() === ""
                    ? "At least one ID is required"
                    : true,
              })}
              className="p-2 border-2 rounded-md text-light-text outline-none"
            />
            {errors.accessOnlyTo && (
              <span className="text-red-500">{t("errors.accessOnlyTo")}</span>
            )}
          </div>
        )}

        {/* Content Upload */}
        <div className="flex flex-col gap-y-1">
          <label className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
            {t("words.content")}
          </label>
          <input
            type="file"
            {...register("content")}
            className="p-2 border-2 rounded-md text-light-text outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full duration-150 max-xs:text-base xs:text-base sm:text-lg lg:text-xl ${
            mode === "light"
              ? "bg-light-secondary hover:text-light-text text-dark-text"
              : "bg-dark-secondary hover:text-dark-text text-light-text"
          } p-2 rounded`}
        >
          {t("words.create")}
        </button>
      </form>
    </div>
  );
}
