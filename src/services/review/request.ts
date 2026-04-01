import { endpoinds } from "../../constants";
import type { Review } from "../../interfaces/review";
import { instance } from "../instance";

export async function getAllReviews(): Promise<Review[] | undefined> {
  try {
    const response = await instance.get<Review[]>(endpoinds.reviews);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getReviewById(id: string): Promise<Review | undefined> {
  try {
    const response = await instance.get<Review>(`${endpoinds.products}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
