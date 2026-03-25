import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page401() {
  return <ErrorDisplay code={401} message="Unauthorized" />;
}
