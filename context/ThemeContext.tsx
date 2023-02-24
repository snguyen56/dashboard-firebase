import { createContext, useState, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
};

type ThemeContextValue = {
  darkMode: boolean;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  darkMode: false,
  toggleTheme: () => {},
  primaryColor: "#673ab7",
  setPrimaryColor: () => {},
  fontSize: 14,
  setFontSize: () => {},
  borderRadius: 4,
  setBorderRadius: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [primaryColor, setPrimaryColor] = useState<string>("#673ab7");
  const [fontSize, setFontSize] = useState<number>(14);
  const [borderRadius, setBorderRadius] = useState<number>(4);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: primaryColor,
          },
        },
        typography: {
          fontSize: fontSize,
        },
        shape: {
          borderRadius: borderRadius,
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                // backgroundColor: darkMode ? "#212121" : "#fff",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
              },
            },
          },
        },
      }),
    [darkMode, primaryColor, fontSize, borderRadius]
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        primaryColor,
        setPrimaryColor,
        fontSize,
        setFontSize,
        borderRadius,
        setBorderRadius,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
