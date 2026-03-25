import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page400() {
  return <ErrorDisplay code={400} message="Bad Request" />;
}
