
import { HiOutlineSearch, HiOutlineCog, HiOutlineBell } from "react-icons/hi";
import Image from "next/image";

export default function Navbar() {
  return (
    <div
      className="flex items-center justify-between py-2 bg-white px-6 border-b-2 border-gray-300 fixed top-0 z-50"
      style={{ left: '16rem', width: 'calc(100% - 16rem)' }}
    >
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        <HiOutlineSearch className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700 text-base font-semibold">Search anything here</span>
      </div>
      <div className="flex items-center gap-6">
        <HiOutlineCog className="w-5 h-5 text-gray-400" />
        <HiOutlineBell className="w-5 h-5 text-gray-400" />
        <div className="relative">
          <Image src="/user_profile.jpg" alt="User" width={36} height={36} className="rounded-full border border-gray-200" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
