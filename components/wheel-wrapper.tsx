"use client";
import Wheel from "@/components/wheel";
import { useState } from "react";

export default function WheelWrapper() {
  const [value, setValue] = useState(30);
  return (
    <>
      <Wheel value={value} />
    </>
  );
}
