import React from "react";
import ReactSelect from "react-select";

const Select = ({
  options,
  onChange,
  placeholder,
  mode = "light", // Default to "light"
  height,
  width = "100%", // Default width
  fontSize = "16px", // Default font size
  defaultValue,
}) => {
  const themeColors = {
    light: {
      background: "#F9FAFB",
      modeButtonBackground: "#E5E7EB",
      hoverOverModeButtonBackground: "#D1D5DB",
      modeButtonIcon: "#374151",
      text: "#111827",
      primary: "#1DA1F2",
    },
    dark: {
      background: "#18191A",
      modeButtonBackground: "#3F3F46",
      hoverOverModeButtonBackground: "#27272A",
      modeButtonIcon: "#E5E7EB",
      text: "#E4E6EB",
      primary: "#8AB4F8",
    },
  };

  const colors = mode === "light" ? themeColors.light : themeColors.dark;

  return (
    <ReactSelect
      defaultValue={defaultValue ? defaultValue : null}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      classNamePrefix="react-select"
      styles={{
        menu: (provided) => ({
          ...provided,
          backgroundColor: colors.background,
          maxHeight: height || "40vh",
          border: `1px solid ${
            mode === "light"
              ? colors.hoverOverModeButtonBackground
              : colors.hoverOverModeButtonBackground
          }`,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? colors.primary
            : state.isFocused
            ? colors.primary
            : colors.modeButtonBackground,
          color: colors.text,
          cursor: "pointer",
          fontSize, // Apply the fontSize prop
        }),
        singleValue: (provided) => ({
          ...provided,
          color: colors.text,
          fontSize, // Apply the fontSize prop
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: colors.modeButtonBackground,
          borderColor: mode === "light" ? colors.primary : colors.primary,
          boxShadow: "none",
          width, // Apply the width prop here
          fontSize, // Apply the fontSize prop
        }),
        input: (provided) => ({
          ...provided,
          color: colors.text,
          fontSize, // Apply the fontSize prop
        }),
        placeholder: (provided) => ({
          ...provided,
          color: mode === "light" ? colors.modeButtonIcon : colors.text,
          fontSize, // Apply the fontSize prop
        }),
      }}
    />
  );
};

export default Select;
