import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import useBasket from "../context/CartContext/cartContext";
import useFavorites from "../context/FavoritesContext/favoritesContext";
import { AiOutlineHeart } from "react-icons/ai";
import useSearchContext from "../context/SearchContext/searchContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useBasket();
  const { totalFavorites } = useFavorites();
  const { searchValue, setSearchValue } = useSearchContext();
  return (
    <div>
      <div className="w-full bg-black flex justify-center items-center h-auto min-h-[38px] py-2 relative px-4 sm:px-6 md:px-12">
        <p className="text-white font-normal text-[11px] sm:text-xs md:text-sm lg:text-base text-center leading-tight">
          Sign up and get 20% off to your first order.
          <span className="font-medium underline ml-1">Sign Up Now</span>
        </p>
        <button className="absolute right-4 md:right-8 text-white">
          <X size={18} />
        </button>
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-3 sm:gap-4 md:gap-8 xl:gap-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-36 relative h-auto md:h-16 pt-4 md:pt-10">
        <div className="md:hidden order-1">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <span className="font-bold text-xl sm:text-2xl md:text-[32px] text-center md:text-left md:w-auto flex-1 md:flex-none order-2 md:order-1 leading-none">
          SHOP.CO
        </span>
        <div className="flex gap-2 sm:gap-3 md:hidden order-3">
          <span className="text-xl">
            <IoSearchOutline />
          </span>
          <Link to="/favorites" className="text-xl relative">
            <AiOutlineHeart />
            {totalFavorites > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full bg-red-600 px-1 text-xs text-white flex items-center justify-center">
                {totalFavorites}
              </span>
            )}
          </Link>
          <Link to="/cart" className="text-xl relative">
            <GrCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full bg-red-600 px-1 text-xs text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <span className="text-xl">
            <CgProfile />
          </span>
        </div>
        <ul
          className={`
    ${menuOpen ? "flex" : "hidden"}
    flex-col gap-3 mt-2 w-full items-center
    md:flex md:flex-row md:mt-0 md:w-auto
    md:justify-start md:items-center
    gap-3 sm:gap-4 md:gap-7
    text-xs sm:text-sm md:text-base font-light
    order-4 md:order-2
  `}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/category"}>Category</Link>
          <Link to={"/cart"}>Cart</Link>
          <Link to={"/favorites"}>Favorite</Link>
        </ul>

        <div className="relative w-full md:w-64 lg:w-80 xl:w-96 hidden md:block order-5 md:order-3">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-12 w-full bg-[#F0F0F0] rounded-full pl-10 pr-4 text-base"
            type="text"
            placeholder="Search"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            <IoSearchOutline />
          </span>
        </div>
        <div className="hidden md:flex gap-4 lg:gap-5 order-6 md:order-4">
          <Link to="/favorites" className="text-xl relative">
            <AiOutlineHeart />
            {totalFavorites > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full bg-red-600 px-1 text-xs text-white flex items-center justify-center">
                {totalFavorites}
              </span>
            )}
          </Link>
          <Link to="/cart" className="text-xl relative">
            <GrCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full bg-red-600 px-1 text-xs text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <span className="text-xl">
            <CgProfile />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
