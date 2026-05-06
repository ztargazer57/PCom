import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ArtistDashboardPage from "./DashboardClientPage";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  return <ArtistDashboardPage />;
}
