import { endpoinds } from "../../constants";
import type { Product } from "../../interfaces/product";
import { instance } from "../instance";

export async function getAllProducts(): Promise<Product[] | undefined> {
  try {
    const response = await instance.get<Product[]>(endpoinds.products);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await instance.get<Product>(`${endpoinds.products}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}