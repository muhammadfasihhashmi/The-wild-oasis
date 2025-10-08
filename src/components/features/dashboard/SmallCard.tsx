import { LucideIcon } from "lucide-react";

function SmallCard({
  cardIcon: CardIcon,
  iconColour,
  circleColour,
  label,
  value,
}: {
  cardIcon: LucideIcon;
  iconColour: string;
  circleColour: string;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 flex gap-3 items-center shadow-md rounded-md dark:bg-zinc-900">
      <div
        className={`h-16 w-16 rounded-full ${circleColour} flex items-center justify-center`}
      >
        <CardIcon className={`w-7 h-7 ${iconColour}`} strokeWidth={1.6} />
      </div>
      <div>
        <div className="text-zinc-600 font-semibold">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default SmallCard;
