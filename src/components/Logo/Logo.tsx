import lightLogo from "../../lightLogo.svg";
import darkLogo from "../../darkLogo.svg";
import { Link } from "react-router-dom";

export enum LogoType {
  light = "LIGHT",
  dark = "DARK",
}

interface LogoProps {
  type: LogoType;
  w?: number;
  h?: number;
}
export function Logo({ type, w, h }: LogoProps) {
  return (
    <Link to="/">
      <img
        src={type === LogoType.light ? darkLogo : lightLogo}
        width={w}
        height={h}
        alt="logo"
      />
    </Link>
  );
}
