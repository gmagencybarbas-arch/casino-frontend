"use client";

import dynamic from "next/dynamic";

const RegisterModal = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => null,
});

export function RegisterModalLazy() {
  return <RegisterModal />;
}
