import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page504() {
  return <ErrorDisplay code={504} message="Gateway Timeout" />;
}
