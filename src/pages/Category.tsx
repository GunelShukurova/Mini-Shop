import { IoIosStar } from "react-icons/io";

import { ChevronRight } from "lucide-react";
import CheckIcon from "@mui/icons-material/Check";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product/requests";
import type { Product } from "../interfaces/product";
import useFavorites from "../context/FavoritesContext/favoritesContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useSearchContext from "../context/SearchContext/searchContext";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedDressStyle, setSelectedDressStyle] = useState<string | null>(
    null,
  );
  const [dressStyles, setDressStyles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { searchValue } = useSearchContext();
  const normalizedSearch = searchValue.trim().toLowerCase();
  const itemsPerPage = 6;
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await getAllProducts();
        if (!productData) return;
        setProducts(productData);

        const uniqueCategories = Array.from(
          new Set(productData.map((p) => p.category)),
        );
        setCategories(uniqueCategories);

        const prices = productData.map((p) => p.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
        setSelectedMinPrice(Math.min(...prices));
        setSelectedMaxPrice(Math.max(...prices));

        const uniqueColors = Array.from(
          new Set(productData.flatMap((p) => p.color)),
        );
        setColors(uniqueColors);

        const uniqueSizes = Array.from(
          new Set(productData.flatMap((p) => p.size)),
        );
        setSizes(uniqueSizes);

        const uniqueDressStyles = Array.from(
          new Set(
            productData.flatMap((p) =>
              Array.isArray(p.dressStyle) ? p.dressStyle : [p.dressStyle],
            ),
          ),
        );
        setDressStyles(uniqueDressStyles);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory
      ? p.category === selectedCategory
      : true;
    const colorMatch = selectedColor ? p.color.includes(selectedColor) : true;
    const sizeMatch = selectedSize ? p.size.includes(selectedSize) : true;
    const priceMatch =
      p.price >= selectedMinPrice && p.price <= selectedMaxPrice;
    const dressStyleMatch = selectedDressStyle
      ? Array.isArray(p.dressStyle)
        ? p.dressStyle.includes(selectedDressStyle)
        : p.dressStyle === selectedDressStyle
      : true;
    const searchMatch =
      !normalizedSearch ||
      p.name.toLowerCase().includes(normalizedSearch) ||
      p.category.toLowerCase().includes(normalizedSearch) ||
      p.description.toLowerCase().includes(normalizedSearch);
    return (
      categoryMatch &&
      colorMatch &&
      sizeMatch &&
      priceMatch &&
      dressStyleMatch &&
      searchMatch
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedColor,
    selectedSize,
    selectedMinPrice,
    selectedMaxPrice,
    selectedDressStyle,
    normalizedSearch,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const renderRatingStars = (rating: number) => (
    <div className="text-amber-300 flex text-lg">
      {Array.from({ length: 5 }, (_, i) => (
        <IoIosStar
          key={i}
          className={i < rating ? "fill-current" : "text-gray-300"}
        />
      ))}
    </div>
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const maxVisiblePages = 6;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = startPage + maxVisiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  const showLeadingEllipsis = startPage > 1;
  const showTrailingEllipsis = endPage < totalPages;

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-10 md:px-35 2xl:px-30">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-80 xl:w-96 bg-white border border-gray-200 rounded-xl p-5 shadow-lg lg:sticky lg:top-5 lg:max-h-[200vh]">
          <h2 className="text-2xl mt-5 mb-5 font-bold text-gray-700">
            Filters
          </h2>
          <div className="border-b border-gray-200"></div>
          <div className="flex flex-col gap-3 mt-5 text-gray-600 text-lg">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`flex justify-between cursor-pointer ${
                  selectedCategory === cat ? "font-bold text-black" : ""
                }`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                <span>{cat}</span>
                <ChevronRight />
              </div>
            ))}
          </div>
          <div className="border-b border-gray-200 mt-5"></div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mt-5 mb-3 font-bold text-gray-700">
              Price
            </h2>
            <span>
              {" "}
              <ChevronUp />
            </span>
          </div>

          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={selectedMaxPrice}
            onChange={(event) => {
              const value = Number(event.target.value);
              setSelectedMaxPrice(Math.max(value, selectedMinPrice));
            }}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm text-gray-700 mb-5">
            <span>${selectedMinPrice}</span>
            <span>${selectedMaxPrice}</span>
          </div>
          <div className="border-b border-gray-200"></div>
          <div className="flex flex-col gap-3 mt-5 text-gray-800 text-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-5 mb-3 font-bold text-gray-700">
                Colors
              </h2>
              <span>
                {" "}
                <ChevronUp />
              </span>
            </div>
            <div className="flex gap-5 flex-wrap">
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                const colorLower = color.toLowerCase();
                const iconClassName =
                  colorLower === "white" ? "text-black" : "text-white";
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(isSelected ? null : color)}
                    className={`h-8 w-8 flex items-center justify-center rounded-full border ${
                      isSelected ? "ring-2 ring-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorLower }}
                  >
                    {isSelected && (
                      <CheckIcon className={`text-md ${iconClassName}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="border-b border-gray-200 mt-5"></div>
          <div className="flex flex-col gap-3 mt-5 text-gray-800 text-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-5 mb-3 font-bold text-gray-700">
                Size
              </h2>
              <span>
                {" "}
                <ChevronUp />
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? null : size)
                  }
                  className={`flex items-center justify-center gap-2 font-light border w-24 sm:w-28 h-12 rounded-full ${
                    selectedSize === size
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mt-5"></div>
          <div className="flex flex-col gap-3 mt-5 text-gray-800 text-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-5 mb-3 font-bold text-gray-700">
                Dress Style
              </h2>
              <span>
                <ChevronUp />
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {dressStyles.map((style) => {
                const isSelected = selectedDressStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() =>
                      setSelectedDressStyle(isSelected ? null : style)
                    }
                    className={`flex items-center justify-center gap-2 font-light border w-24 sm:w-28 h-12 rounded-full ${
                      isSelected
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-center lg:text-left 2xl:ml-20">
            Casual
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 mt-10 justify-items-center">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="flex flex-col cursor-pointer">
                <div className="relative w-full max-w-sm">
                  <img
                    className="w-full rounded-2xl"
                    src={product.image}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                    onClick={() => toggleFavorite(product)}
                  >
                    {isFavorite(product.id) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                </div>
                <div className="mt-5 flex flex-col">
                  <span className="font-semibold">{product.name}</span>
                  <div className="flex gap-2 items-center">
                    {renderRatingStars(product.rating)}
                    <span className="text-sm text-gray-600">
                      {product.rating}/5
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">
                      $
                      {product.sale
                        ? product.price - (product.price * product.sale) / 100
                        : product.price}
                    </span>
                    {product.sale ? (
                      <>
                        <span className="text-xl text-gray-400 line-through">
                          ${product.price}
                        </span>
                        <span className="text-xs font-semibold text-red-500 bg-red-200 px-2 rounded-full py-1">
                          -{product.sale}%
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-sm 2xl:mx-10">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto rounded-xl border flex items-center justify-center gap-3 text-black border-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft /> Previous
            </button>
            <div className="flex items-center justify-center flex-wrap gap-3">
              {showLeadingEllipsis ? (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={
                      currentPage === 1 ? "font-semibold text-black " : ""
                    }
                  >
                    1
                  </button>
                  {startPage > 2 ? (
                    <span className="text-gray-400">..</span>
                  ) : null}
                </>
              ) : null}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "font-semibold text-black bg-gray-200 px-3 py-2 rounded-lg"
                      : ""
                  }
                >
                  {page}
                </button>
              ))}
              {showTrailingEllipsis ? (
                <>
                  {endPage < totalPages - 1 ? (
                    <span className="text-gray-400">..</span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    className={
                      currentPage === totalPages
                        ? "font-semibold text-black"
                        : ""
                    }
                  >
                    {totalPages}
                  </button>
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto rounded-xl border border-gray-200 px-4 py-2 flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
