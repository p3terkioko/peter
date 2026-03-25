"use client";

import ErrorDisplay from "@/components/ErrorDisplay";

export default function NotFound() {
  return <ErrorDisplay code={404} message="Not Found" />;
}
