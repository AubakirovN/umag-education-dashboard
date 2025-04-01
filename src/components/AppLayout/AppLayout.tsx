import { AppShell } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";

import { AppNavbar } from "./components/Navbars/AppNavbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { EmptyNavbar } from "./components/Navbars/EmptyNavbar";
import { useEffect } from "react";

export function AppLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isNavOpened = useSelector((state: RootState) => state.settings.appNavbar);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate, token]);

  return (
    <AppShell navbar={isNavOpened ? <AppNavbar /> : <EmptyNavbar />}>
      <Outlet />
    </AppShell>
  );
}
