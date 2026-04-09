import { endpoinds } from "../../constants";
import type { Product } from "../../interfaces/product";
import { instance } from "../instance";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  thumbnail: string;
  images: string[];
};

const defaultSizes = ["Small", "Medium", "Large"];
const defaultColors = ["Black", "White", "Blue"];

const mapDummyProduct = (product: DummyProduct): Product => {
  const sale = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;
  return {
    id: product.id,
    name: product.title,
    category: product.category,
    dressStyle: product.category,
    price: product.price,
    sale,
    rating: product.rating,
    size: defaultSizes,
    color: defaultColors,
    image: product.thumbnail,
    images: product.images,
    isNewArrivals: product.id <= 8,
    isTopSelling: product.rating >= 4.7,
    description: product.description,
  };
};

export async function getAllProducts(): Promise<Product[] | undefined> {
  try {
    const response = await instance.get<{ products: DummyProduct[] }>(
      endpoinds.products,
    );
    return response.data.products.map(mapDummyProduct);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await instance.get<DummyProduct>(
      `${endpoinds.products}/${id}`,
    );
    return mapDummyProduct(response.data);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
