import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../interfaces/product";
import { getProductById } from "../services/product/requests";
import { IoIosStar } from "react-icons/io";
import CheckIcon from "@mui/icons-material/Check";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData || null);
      } catch (error) {
        console.log(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 pt-14 sm:pt-28 lg:pt-22 flex flex-col lg:flex-row gap-6 lg:gap-10 px-35  mix-g min-h-screen">
      <div className="flex  w-full lg:w-auto gap-3">
        <div className="flex flex-col gap-3">
          <img
            className="h-16 sm:h-20 md:h-24 lg:h-58 w-full object-cover rounded-xl"
            src={product.image}
            alt={product.name}
          />
          <img
            className="h-16 sm:h-20 md:h-24 lg:h-58 w-full object-cover rounded-xl"
            src={product.images?.[0] ?? product.image}
            alt={product.name}
          />
          <img
            className="h-16 sm:h-20 md:h-24 lg:h-58 w-full object-cover rounded-xl"
            src={product.images?.[1] ?? product.image}
            alt={product.name}
          />
        </div>
        <img
          className="w-full max-w-2xl h-200 sm:h-52 md:h-80 lg:h-180 object-cover rounded-xl mb-5"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col gap-4 text-gray-700 w-full lg:w-[420px] xl:w-[700px] bg-white p-6 rounded-lg shadow-sm h-[37.5vw]">
        <span className="text-2xl sm:text-3xl text-gray-900 font-extrabold">
          {product.name}
        </span>
        <div className="flex gap-1">
          <div className="text-amber-300 flex text-lg">
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
        <div>
          <button className="bg-green-800 text-white h-10 w-10 flex items-center justify-center rounded-full">
            <CheckIcon className="text-lg" />
          </button>
        </div>
        <div className="border-b border-gray-200 "></div>
        <div>
          <span className="text-xl text-gray-500">Choose Size</span>
        </div>
        <div className="flex gap-3">
          <button className="tex-lg font-light text-gray-500 bg-[#F0F0F0] px-6 py-2 rounded-full">
            Small
          </button>
          <button className="tex-lg font-light text-gray-500 bg-[#F0F0F0] px-6 py-2 rounded-full">
            Small
          </button>
          <button className="tex-lg font-light text-gray-500 bg-[#F0F0F0] px-6 py-2 rounded-full">
            Small
          </button>
          <button className="tex-lg font-light text-gray-500 bg-[#F0F0F0] px-6 py-2 rounded-full">
            Small
          </button>
        </div>
        <div className="border-b border-gray-200 "></div>
        <div className="flex gap-3">
          <div className="flex gap-7 bg-[#F0F0F0] w-40 px-7 py-1 rounded-full text-2xl justify-center items-center">
            <span>
              <FiMinus />
            </span>{" "}
            <span>0</span>{" "}
            <span>
              <GoPlus />
            </span>
          </div>
          <div>
            <button className="w-100 bg-black text-white h-10 rounded-full">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
