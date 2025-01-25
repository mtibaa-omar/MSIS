import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
import { MenuItem, Select, useColorScheme } from "@mui/material";
import { LuSunMoon } from "react-icons/lu";

export default function DarkMode(props) {
  const { setDarkMode } = useDarkMode();

  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
        setDarkMode(event.target.value);
      }}
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value="system">
        <LuSunMoon size={20} /> &nbsp; System
      </MenuItem>
      <MenuItem value="light">
        <HiOutlineSun size={20} /> &nbsp;Light
      </MenuItem>
      <MenuItem value="dark">
        <HiOutlineMoon size={18} />
        &nbsp; Dark
      </MenuItem>
    </Select>
  );
}
