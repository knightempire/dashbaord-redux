import { HiUserGroup, HiChevronDown, HiDocumentText, HiClock, HiCog } from "react-icons/hi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-lg fixed top-0 left-0 h-screen flex flex-col justify-between py-6 px-4 z-40">
      <div>
        <div className="flex justify-center items-center mb-8">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="h-16 w-24" />
        </div>
        <nav className="flex flex-col gap-6">
          {/* Employees Group */}
          <div className="  px-0 py-0 flex flex-col gap-2 ">
            <div className="flex items-center gap-2 mb-2 bg-[#183B4A] rounded-full px-4 py-2 text-white">
              <HiUserGroup className="w-5 h-5 text-white" />
              <span className="font-bold text-base tracking-tight flex-1 flex items-center">
                Employees
              </span>
              <HiChevronDown className="w-4 h-4 text-white ml-auto" />
            </div>
            <div className="pl-7 flex flex-col gap-4 ">
              <span className="font-bold text-sm flex items-center gap-2 text-black pl-4">
                <span className="w-2 h-2 rounded-full bg-black inline-block mr-2" />
                All Employees
              </span>
              <span className="text-sm text-[#7B8794] flex items-center gap-2 pl-4">
                <span className="w-2 h-2 rounded-full bg-[#7B8794] inline-block mr-2" />
                Recent hires
              </span>
            </div>
          </div>
          {/* Other Nav Items */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-muted rounded-lg cursor-pointer text-sm font-medium">
              <HiDocumentText className="w-5 h-5" /> Payroll
            </span>
            <span className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-muted rounded-lg cursor-pointer text-sm font-medium">
              <HiClock className="w-5 h-5" /> Reports
            </span>
            <span className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-muted rounded-lg cursor-pointer text-sm font-medium">
              <HiCog className="w-5 h-5" /> Settings
            </span>
          </div>
        </nav>
      </div>
      <div className="mb-2">
        <hr className="mb-4 border-gray-200" />
        <Button variant="ghost" className="w-full flex items-center justify-start gap-2 text-[#183B4A] text-base font-medium px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75l3-3m0 0l-3-3m3 3H8.25" />
          </svg>
          Log out
        </Button>
      </div>
    </aside>
  );
}
