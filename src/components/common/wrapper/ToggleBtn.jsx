import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../../hooks/context/ThemeContext";
import { faMoon, faSun, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useLangStore } from "../../../store/useLangStore";
import { Button } from "../../ui";

export const ToggleBtn = ({ isTheme = false, isLang = false }) => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLangStore();

  return (
    <Button
      fn={isTheme ? toggleTheme : isLang ? toggleLanguage : ""}
      content={
        isLang ? (
          <FontAwesomeIcon icon={faLanguage} />
        ) : isTheme ? (
          theme == "dark" ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )
        ) : (
          ""
        )
      }
      className={`relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`}
    />
  );
}
