import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
const LanguageSelector = () => {
  const { mode } = useSelector((state) => state.settings);
  const { t, i18n } = useTranslation();
  const [showLangs, setShowLangs] = useState(false);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangs(false);
  };

  // Get languages object from translations and convert it to an array
  const languages = Object.values(t("languages", { returnObjects: true }));
  // Find the current language object based on the language code
  // const currentLanguage = languages.find((lang) => lang.code === i18n.language);
  return (
    <div name="Select a language" className="fixed left-1 bottom-7">
      <span
        onClick={() => setShowLangs(!showLangs)}
        className={`flex cursor-pointer p-1 items-center font-normal justify-center lg:w-11 lg:h-11 max-lg:w-10 max-lg:h-10 max-md:w-9 max-md:h-9 max-sm:w-7 max-sm:h-7 max-sm360:w-6 max-sm360:h-6 max-sm:text-sm max-sm360:text-xs rounded-full duration-150 ${
          mode === "light"
            ? "hover:bg-light-modeButtonBackground bg-light-primary text-light-modeButtonIcon"
            : "hover:bg-dark-modeButtonBackground bg-dark-primary text-dark-modeButtonIcon"
        } `}
      >
        {i18n.language.toUpperCase()}
      </span>
      <AnimatePresence>
        {showLangs && (
          <motion.div
            initial={{ opacity: 0, x: 200 }} // Starting state
            animate={{ opacity: 1, x: 0 }} // Animate to this state
            exit={{ opacity: 0, x: 200 }} // Exit state
            transition={{ duration: 0.3 }} // Duration of transition
            className={`${
              mode === "light"
                ? "bg-light-modeButtonBackground"
                : "bg-dark-modeButtonBackground"
            } absolute bottom-[calc(100%+20px)] md:bottom-[calc(100%+30px)] p-2 max-sm360:p-1 flex flex-col items-center gap-y-1 
            rounded-md min-w-20 w-auto left-1 `}
          >
            {languages.map((lang, index) => (
              <button
                className={`max-sm:text-xs max-sm360:text-[10px] py-1 px-2 w-full duration-150  rounded-full flex justify-center items-center ${
                  i18n.language.toUpperCase() === lang.code.toUpperCase()
                    ? mode === "light"
                      ? "bg-light-primary"
                      : "bg-dark-primary"
                    : ""
                } ${
                  mode === "light"
                    ? "hover:bg-light-primary"
                    : "hover:bg-dark-primary"
                }`}
                key={index}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
