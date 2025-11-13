
import { ThemeProvider } from "./context/theme/theme-provider";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
