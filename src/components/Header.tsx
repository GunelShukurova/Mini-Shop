import { useState } from "react";
import { X } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Top Promo Bar */}
      <div className="w-full bg-black flex justify-center items-center h-[38px] relative px-4 md:px-12">
        <p className="text-white font-normal text-xs md:text-sm text-center md:text-base">
          Sign up and get 20% off to your first order.
          <span className="font-medium underline ml-1">Sign Up Now</span>
        </p>
        <button className="absolute right-4 md:right-8 text-white">
          <X size={18} />
        </button>
      </div>

      {/* Main Nav */}
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-8 xl:gap-12 px-4 md:px-36 relative h-auto md:h-16 pt-10">

        {/* Mobile Burger */}
        <div className="md:hidden order-1">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* SHOP.CO */}
        <span className="font-bold text-2xl md:text-[32px] text-center md:text-left md:w-auto flex-1 md:flex-none order-2 md:order-1">
          SHOP.CO
        </span>

        {/* Mobile Icons (Search → Cart → Profile) */}
        <div className="flex gap-3 md:hidden order-3">
          <span className="text-xl"><IoSearchOutline /></span>
          <span className="text-xl"><GrCart /></span>
          <span className="text-xl"><CgProfile /></span>
        </div>

        {/* UL */}
        <ul className={`${menuOpen ? "flex flex-col gap-3 mt-2 w-full" : "hidden md:flex"} 
                        flex-wrap justify-center md:justify-start gap-4 md:gap-7 text-sm md:text-base font-light md:w-auto order-4 md:order-2`}>
          <li>Shop</li>
          <li>On Sale</li>
          <li>New Arrivals</li>
          <li>Brands</li>
        </ul>

        {/* Input (desktop only) */}
        <div className="relative w-full md:w-80 lg:w-96 hidden md:block order-5 md:order-3">
          <input
            className="h-12 w-full bg-[#F0F0F0] rounded-full pl-10 pr-4 text-base"
            type="text"
            placeholder="Search"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            <IoSearchOutline />
          </span>
        </div>

        {/* Desktop Icons (Cart → Profile) */}
        <div className="hidden md:flex gap-5 order-6 md:order-4">
          <span className="text-xl"><GrCart /></span>
          <span className="text-xl"><CgProfile /></span>
        </div>

      </div>
    </div>
  );
};

export default Header;