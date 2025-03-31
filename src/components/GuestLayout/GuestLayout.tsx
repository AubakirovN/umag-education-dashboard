import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";
import { GuestFooter } from "./components/GuestFooter";
import { GuestHeader } from "./components/GuestHeader";
import { useEffect } from "react";

export function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
  }, [navigate, token]);

  return (
    <>
      <GuestHeader />
      <Container>
        <Outlet />
      </Container>
      {!location.pathname.includes("/auth/") && <GuestFooter />}
    </>
  );
}
