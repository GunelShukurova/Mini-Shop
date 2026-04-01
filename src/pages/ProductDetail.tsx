import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/product";
import { getAllProducts, getProductById } from "../services/product/requests";
import { IoIosStar } from "react-icons/io";
import CheckIcon from "@mui/icons-material/Check";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import type { Review } from "../interfaces/review";
import { getAllReviews } from "../services/review/request";
import { IoIosArrowDown } from "react-icons/io";

import { MdOutlineStarBorder } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // массив товаров
  const navigate = useNavigate();

  // В useEffect
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        const reviewsData = await getAllReviews();
        const allProducts = await getAllProducts(); // получаем все продукты

        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.image); // сразу выбранное изображение
        }

        if (allProducts) {
          setProducts(allProducts); // сохраняем все продукты
        }

        const filteredReviews =
          reviewsData?.filter((rev) => rev.productId === id) || [];
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
      <div className="p-4 pt-14 sm:pt-28 lg:pt-22 flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 sm:px-10 lg:px-75  ">
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <div className="flex flex-col lg:flex-row w-full gap-3">
            {/* Большое изображение */}
            <img
              className="w-full max-w-2xl h-60 sm:h-72 md:h-80 lg:h-[470px] object-cover rounded-xl mb-3 lg:mb-0 order-1 lg:order-2"
              src={selectedImage || product.image}
              alt={product.name}
            />

            {/* Маленькие изображения */}
            <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1 lg:w-28">
              <img
                onClick={() => setSelectedImage(product.image)}
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${
                  selectedImage === product.image || !selectedImage
                    ? "border-black"
                    : "border-transparent"
                }`}
                src={product.image}
                alt={product.name}
              />

              <img
                onClick={() =>
                  setSelectedImage(product.images?.[0] ?? product.image)
                }
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${
                  selectedImage === (product.images?.[0] ?? product.image)
                    ? "border-black"
                    : "border-transparent"
                }`}
                src={product.images?.[0] ?? product.image}
                alt={product.name}
              />

              <img
                onClick={() =>
                  setSelectedImage(product.images?.[1] ?? product.image)
                }
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${
                  selectedImage === (product.images?.[1] ?? product.image)
                    ? "border-black"
                    : "border-transparent"
                }`}
                src={product.images?.[1] ?? product.image}
                alt={product.name}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-gray-700 w-full lg:w-[420px] xl:w-[750px] bg-white rounded-lg lg:h-[29vw]">
          <span className="text-2xl sm:text-2xl text-gray-900 font-extrabold">
            {product.name}
          </span>
          <div className="flex gap-1">
            <div className="text-amber-300 flex text-xl">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
            </div>
            <span className="text-sm text-gray-600">4.5/5</span>
          </div>
          <div>
            <span className="text-2xl font-bold"> ${product.price}</span>
          </div>
          <div>
            <p className="text-gray-500 text-xl">{product.description}</p>
          </div>
          <div className="border-b border-gray-200 "></div>
          <div>
            <span className="text-xl text-gray-500">Select Colors</span>
          </div>
          <div className="flex gap-5">
            <button className="bg-[#4F4631] text-white h-8 w-8 flex items-center justify-center rounded-full">
              <CheckIcon className="text-md" />
            </button>
            <button className="bg-[#31344F] text-white h-8 w-8 flex items-center justify-center rounded-full">
              <CheckIcon className="text-md" />
            </button>
            <button className="bg-[#314F4A] text-white h-8 w-8 flex items-center justify-center rounded-full">
              <CheckIcon className="text-md" />
            </button>
          </div>
          <div className="border-b border-gray-200 "></div>
          <div>
            <span className="text-lg text-gray-500">Choose Size</span>
          </div>
          <div className="flex gap-3">
            {product.size?.map((size, index) => (
              <button
                key={index}
                className="text-lg font-light text-gray-500 bg-[#F0F0F0] px-6 py-2 rounded-full"
              >
                {size}
              </button>
            ))}
          </div>
          <div className="border-b border-gray-200 "></div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-7 bg-[#F0F0F0] w-full sm:w-40 px-7 py-1 rounded-full text-2xl justify-center items-center">
              <span>
                <FiMinus />
              </span>
              <span>0</span>
              <span>
                <GoPlus />
              </span>
            </div>

            <button className="w-full sm:flex-1 bg-black text-white h-13 rounded-full">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <section>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-20 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-500 font-light">
              Product Details
            </span>
            <div className="border-b  w-100 border-gray-200 mt-2 rounded"></div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-700 font-normal">
              Rating & Reviews
            </span>
            <div className="border-b  w-100 border-gray-400 mt-2 rounded"></div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-500 font-light">FAQs</span>
            <div className="border-b  w-100 border-gray-200 mt-2 rounded"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between flex-wrap gap-4 mx-4 sm:mx-10 lg:mx-20 xl:mx-76 mb-10">
          {/* Левая часть */}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-normal">All Reviews</h2>
            <span className="text-gray-400">({reviews.length})</span>
          </div>

          {/* Правая часть */}
          <div className="flex gap-4 flex-wrap">
            <button className="flex items-center justify-center gap-2 font-light border border-gray-300 w-[160px] h-[48px] rounded-full">
              Latest
              <IoIosArrowDown />
            </button>

            <button className="font-light border border-gray-300 w-[180px] h-[48px] rounded-full bg-black text-white">
              Write a Review
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-4 sm:mx-10 lg:mx-20 xl:mx-76 gap-6 sm:gap-8 lg:gap-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="w-full border border-gray-200 rounded-2xl p-6 flex flex-col gap-2 h-auto sm:h-60"
            >
              {/* Рейтинг */}
              <div className="text-amber-300 flex text-lg">
                {[...Array(5)].map((_, index) =>
                  index < rev.rating ? (
                    <IoIosStar key={index} />
                  ) : (
                    <MdOutlineStarBorder key={index} />
                  ),
                )}
              </div>

              {/* Пользователь */}
              <div className="flex gap-2 items-center mt-2">
                <span className="text-lg sm:text-xl font-medium">
                  {rev.user}
                </span>
                <button className="bg-green-600 text-white h-5 w-5 flex items-center justify-center rounded-full">
                  <CheckIcon className="text-xs p-1" />
                </button>
              </div>

              {/* Текст отзыва */}
              <p className="font-light text-gray-500 text-sm sm:text-base mt-2">
                "{rev.review}"
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="font-light border border-gray-300 w-[180px] sm:w-[210px] h-[48px] sm:h-[52px] rounded-full">
            Load More Reviews
          </button>
        </div>
      </section>
   <section>
  <h2 className="text-2xl md:text-4xl font-extrabold text-center mt-10">
    YOU MIGHT ALSO LIKE
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 justify-items-center px-5 md:px-20 xl:px-70">
    {products
      ?.filter(
        (pro) =>
          pro.category === product?.category && pro.id !== product.id,
      )
      .map((pro) => (
        <div
          key={pro.id}
          className="flex flex-col cursor-pointer h-[500px] sm:h-[520px] lg:h-[550px] w-full sm:w-80"
          onClick={() => navigate(`/${pro.id}`)}
        >
          <img
            className="w-full h-[60%] object-cover rounded-2xl"
            src={pro.image}
            alt={pro.name}
          />
          <div className="mt-5 flex flex-col h-[40%]">
            <span className="font-semibold">{pro.name}</span>
            <div className="flex gap-2 items-center">
              <div className="text-amber-300 flex text-lg">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
              </div>
              <span className="text-sm text-gray-600">4.5/5</span>
            </div>
            <span className="text-xl font-semibold">
              ${pro.sale ? pro.price - (pro.price * pro.sale) / 100 : pro.price}
            </span>
          </div>
        </div>
      ))}
  </div>
</section>
    </div>
  );
};

export default ProductDetail;
