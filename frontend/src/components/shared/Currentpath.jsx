import { useLocation } from "react-router-dom";

export default function Currentpath(path, exact = false) {
  const location = useLocation();

  if (exact) {
    return location.pathname === path;
  }

  if (path.startsWith('/settings')) {
    return location.pathname.startsWith('/settings');
  }

  return location.pathname.startsWith(path);
}