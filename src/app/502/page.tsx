import ErrorDisplay from "@/components/ErrorDisplay";

export default function Page502() {
  return <ErrorDisplay code={502} message="Bad Gateway" />;
}
