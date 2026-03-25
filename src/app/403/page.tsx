import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page403() {
  return <ErrorDisplay code={403} message="Forbidden" />;
}
