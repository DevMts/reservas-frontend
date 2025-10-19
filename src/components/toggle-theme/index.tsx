"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "../ui/toggle";

export function ToggleTheme({ className }: { className: string }) {
  const { setTheme, theme } = useTheme();

  function handleTheme() {
    console.log(theme);
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <Toggle className={className} onClick={handleTheme} variant={"outline"}>
      {theme === "light" ? (
        <Sun size={25} color="black" />
      ) : (
        <Moon size={25} color="white" />
      )}
    </Toggle>
  );
}
