import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../PComponents/Header.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-4 px-4 pb-20 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
