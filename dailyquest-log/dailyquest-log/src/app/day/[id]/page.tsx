import { Day } from "@/types/Day";
import DayViewer from "@/components/DayViewer";
import { getDay } from "../../../lib/utils";

export default async function DayPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const day = getDay(Number(id));

  if (!day) {
    return <p className="p-6">No existe este día.</p>;
  }

  return <DayViewer day={day} />;
}
