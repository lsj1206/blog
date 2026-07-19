import { useEffect, useState } from "react";

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const onChangeTheme = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", updatedTheme);
    }
  };

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  return {
    theme,
    onChangeTheme,
  };
};

export default useTheme;
