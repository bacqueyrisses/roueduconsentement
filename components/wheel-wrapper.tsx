"use client";
import Wheel from "@/components/wheel";
import { useState } from "react";

export default function WheelWrapper() {
  const [value, setValue] = useState(100);
  return (
    <>
      <button
        className={"z-10"}
        onClick={() => setValue((prevState) => prevState + 10)}
      >
        {/*Change*/}
      </button>
      <Wheel value={value} />
    </>
  );
}
