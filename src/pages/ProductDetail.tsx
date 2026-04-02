import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/product";
import { getAllProducts, getProductById } from "../services/product/requests";
import { IoIosStar } from "react-icons/io";
import { MdOutlineStarBorder } from "react-icons/md";
import CheckIcon from "@mui/icons-material/Check";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import type { Review } from "../interfaces/review";
import { getAllReviews } from "../services/review/request";
import useBasket from "../context/CartContext/cartContext";
import useFavorites from "../context/FavoritesContext/favoritesContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useSearchContext from "../context/SearchContext/searchContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useBasket();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { searchValue } = useSearchContext();
  const navigate = useNavigate();
  const normalizedSearch = searchValue.trim().toLowerCase();

  const renderRatingStars = (rating: number, sizeClass = "text-lg") => (
    <div className={`text-amber-300 flex ${sizeClass}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IoIosStar
          key={i}
          className={i < rating ? "fill-current" : "text-gray-300"}
        />
      ))}
    </div>
  );

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        const reviewsData = await getAllReviews();
        const allProducts = await getAllProducts();

        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.image);
          setSelectedSize(productData.size?.[0] || null);
          setSelectedColor(productData.color?.[0] || null);
        }

        if (allProducts) setProducts(allProducts);

        const filteredReviews = reviewsData?.filter((rev) => rev.productId === id) || [];
        setReviews(filteredReviews);
      } catch (error) {
        console.log(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-4 pt-14 sm:pt-28 lg:pt-22 flex flex-col xl:flex-row gap-6 xl:gap-10 px-4 sm:px-10 xl:px-75">
        <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
          <div className="flex flex-col xl:flex-row w-full gap-3">
            <img
              className="w-full max-w-2xl h-60 sm:h-72 md:h-80 xl:h-[470px] xl:w-[470px] xl:max-w-none object-cover rounded-xl mb-3 xl:mb-0 order-1 xl:order-2"
              src={selectedImage || product.image}
              alt={product.name}
            />

            <div className="flex flex-row xl:flex-col gap-3 order-2 xl:order-1 xl:w-28">
              {[product.image, product.images?.[0], product.images?.[1]].map((img, index) =>
                img ? (
                  <img
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${
                      selectedImage === img ? "border-black" : "border-transparent"
                    }`}
                    src={img}
                    alt={product.name}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-gray-700 w-full xl:w-[420px] 2xl:w-[750px] bg-white rounded-lg xl:h-[29vw]">
          <span className="text-2xl sm:text-2xl text-gray-900 font-extrabold">{product.name}</span>
          <div className="flex gap-1">
            {renderRatingStars(product.rating, "text-xl")}
            <span className="text-sm text-gray-600">{product.rating}/5</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
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
          <div>
            <p className="text-gray-500 text-xl">{product.description}</p>
          </div>

          <div className="border-b border-gray-200"></div>
          <div>
            <span className="text-xl text-gray-500">Select Colors</span>
          </div>
          <div className="flex gap-5">
            {product.color?.map((color) => (
              <button
                key={color}
                className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer ${
                  selectedColor === color ? "border-2 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && <CheckIcon className="text-white text-sm" />}
              </button>
            ))}
          </div>

          <div className="border-b border-gray-200"></div>
          <div>
            <span className="text-lg text-gray-500">Choose Size</span>
          </div>
          <div className="flex gap-3">
            {product.size?.map((size) => (
              <button
                key={size}
                className={`text-lg font-light px-6 py-2 rounded-full ${
                  selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0] text-gray-500"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="border-b border-gray-200"></div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-7 bg-[#F0F0F0] w-full sm:w-40 px-7 py-1 rounded-full text-2xl justify-center items-center">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)}>
                <GoPlus />
              </button>
            </div>

            <button
              className="w-full sm:flex-1 bg-black text-white h-13 rounded-full"
              onClick={() => {
                if (!product || !selectedSize || !selectedColor) return;
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    sale: product.sale,
                    image: product.image,
                    size: selectedSize,
                    color: selectedColor,
                  },
                  quantity
                );
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-5 2xl:px-70" >All Reviews ({reviews.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-4 sm:mx-10 lg:mx-20 2xl:mx-70">
          {reviews.map((rev) => (
            <div key={rev.id} className="w-full border border-gray-200 rounded-2xl p-6 flex flex-col gap-2 h-auto sm:h-60">
              <div className="text-amber-300 flex text-lg">
                {[...Array(5)].map((_, i) => (i < rev.rating ? <IoIosStar key={i} /> : <MdOutlineStarBorder key={i} />))}
              </div>
              <div className="flex gap-2 items-center mt-2">
                <span className="text-lg sm:text-xl font-medium">{rev.user}</span>
                <button className="bg-green-600 text-white h-5 w-5 flex items-center justify-center rounded-full">
                  <CheckIcon className="text-xs p-1" />
                </button>
              </div>
              <p className="font-light text-gray-500 text-sm sm:text-base mt-2">"{rev.review}"</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mt-10">YOU MIGHT ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 justify-items-center px-5 md:px-20 xl:px-70">
          {products
            ?.filter((pro) => pro.category === product?.category && pro.id !== product.id)
            .filter((pro) => {
              if (!normalizedSearch) return true;
              return (
                pro.name.toLowerCase().includes(normalizedSearch)
                || pro.category.toLowerCase().includes(normalizedSearch)
                || pro.description.toLowerCase().includes(normalizedSearch)
              );
            })
            .map((pro) => (
              <div
                key={pro.id}
                className="flex flex-col cursor-pointer h-[500px] sm:h-[520px] lg:h-[550px] w-full sm:w-80"
                onClick={() => navigate(`/product/${pro.id}`)}
              >
                <div className="relative h-[60%]">
                  <img className="w-full h-full object-cover rounded-2xl" src={pro.image} alt={pro.name} />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(pro);
                    }}
                  >
                    {isFavorite(pro.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                </div>
                <div className="mt-5 flex flex-col h-[40%]">
                  <span className="font-semibold">{pro.name}</span>
                  <div className="flex gap-2 items-center">
                    {renderRatingStars(pro.rating)}
                    <span className="text-sm text-gray-600">{pro.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">
                      ${pro.sale ? pro.price - (pro.price * pro.sale) / 100 : pro.price}
                    </span>
                    {pro.sale ? (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ${pro.price}
                        </span>
                        <span className="text-xs font-semibold text-red-500">
                          -{pro.sale}%
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
