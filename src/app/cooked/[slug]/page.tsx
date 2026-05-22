import { redirect } from "next/navigation";
export default function CookedSlug({ params }: { params: { slug: string } }) {
  redirect(`/kitchen/${params.slug}`);
}
