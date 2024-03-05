'use client'
import { useEffect } from "react";

export default function ImportJSFiles() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    require("../js/main");
  }, []);
  return null;
}