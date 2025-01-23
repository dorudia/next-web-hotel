import Link from "next/link";
import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[25%_75%] h-full">
      <SideNavigation />

      <div className="h-full py-1">{children}</div>
    </div>
  );
}
