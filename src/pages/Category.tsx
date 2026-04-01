import { IoIosStar } from "react-icons/io";

import { ChevronRight } from "lucide-react";
import CheckIcon from "@mui/icons-material/Check";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product/requests";
import type { Product } from "../interfaces/product";
import useFavorites from "../context/FavoritesContext/favoritesContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


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
const [selectedDressStyle, setSelectedDressStyle] = useState<string | null>(null);
const [dressStyles, setDressStyles] = useState<string[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();

useEffect(() => {
  const loadData = async () => {
    try {
      const productData = await getAllProducts();
      if (!productData) return;
      setProducts(productData);

      // Категории
      const uniqueCategories = Array.from(
        new Set(productData.map((p) => p.category))
      );
      setCategories(uniqueCategories);

      // Цены
      const prices = productData.map((p) => p.price);
      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
      setSelectedMinPrice(Math.min(...prices));
      setSelectedMaxPrice(Math.max(...prices));

      // Цвета
      const uniqueColors = Array.from(
        new Set(productData.flatMap((p) => p.color))
      );
      setColors(uniqueColors);

      // Размеры
      const uniqueSizes = Array.from(
        new Set(productData.flatMap((p) => p.size))
      );
      setSizes(uniqueSizes);

      // Dress Styles — динамически из JSON
      const uniqueDressStyles = Array.from(
        new Set(
          productData.flatMap((p) =>
            Array.isArray(p.dressStyle) ? p.dressStyle : [p.dressStyle]
          )
        )
      );
      setDressStyles(uniqueDressStyles);
    } catch (error) {
      console.log(error);
    }
  };
  loadData();
}, []);

  // Фильтрованные продукты
const filteredProducts = products.filter((p) => {
  const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
  const colorMatch = selectedColor ? p.color.includes(selectedColor) : true;
  const sizeMatch = selectedSize ? p.size.includes(selectedSize) : true;
  const priceMatch =
    p.price >= selectedMinPrice && p.price <= selectedMaxPrice;
  const dressStyleMatch = selectedDressStyle
    ? (Array.isArray(p.dressStyle) ? p.dressStyle.includes(selectedDressStyle) : p.dressStyle === selectedDressStyle)
    : true;
  return categoryMatch && colorMatch && sizeMatch && priceMatch && dressStyleMatch;
});
  return (
    <div className="mt-10 px-4 sm:px-10 md:px-35">
<div className="flex flex-col lg:flex-row gap-10 items-start">
      <div className="w-full lg:w-80 xl:w-96 bg-white border border-gray-200 rounded-xl p-5 shadow-lg  lg:top-5 max-h-[105vh] ">
          {/* Заголовок */}
          <h2 className="text-2xl mt-5 mb-5 font-bold text-gray-700">
            Filters
          </h2>
          <div className="border-b border-gray-200"></div>

          {/* Категории */}
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

          {/* Price */}
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

          {/* Colors */}
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
                    onClick={() =>
                      setSelectedColor(isSelected ? null : color)
                    }
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

          {/* Size */}
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
                  className={`flex items-center justify-center gap-2 font-light border w-28 h-12 rounded-full ${
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

    {/* Dress Style */}
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
          className={`flex items-center justify-center gap-2 font-light border w-28 h-12 rounded-full ${
            isSelected ? "border-black text-black" : "border-gray-300 text-gray-500"
          }`}
        >
          {style}
        </button>
      );
    })}
  </div>
</div>

          {/* Кнопка Apply Filter */}
      
        </div>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
            Casual
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 justify-items-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col cursor-pointer">
                <div className="relative w-full max-w-sm">
                  <img
                    className="w-full rounded-2xl"
                    src={product.image}
                    alt={product.name}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                    onClick={() => toggleFavorite(product)}
                  >
                    {isFavorite(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                </div>
                <div className="mt-5 flex flex-col">
                  <span className="font-semibold">{product.name}</span>
                  <div className="flex gap-2 items-center">
                    <div className="text-amber-300 flex text-lg">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IoIosStar key={i} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">
                      ${product.sale
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
        </div>
      </div>
    </div>
  );
};

export default Category;
