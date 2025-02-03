import { getAllDocuments } from "@/utils/firebase";

export async function getRegions() {
  const allRegions = await getAllDocuments("regions");
  return allRegions;
}
