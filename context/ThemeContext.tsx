import { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
};

type ThemeContextValue = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  darkMode: false,
  toggleTheme: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#212121" : "#fff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // contained: {
          //   backgroundColor: "#6f42c1",
          //   color: darkMode ? "#fff" : "#212121",
          //   "&:hover": {
          //     backgroundColor: "#9472D4",
          //   },
          // },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
