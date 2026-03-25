import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page503() {
  return <ErrorDisplay code={503} message="Service Unavailable" />;
}
