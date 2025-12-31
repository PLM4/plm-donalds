import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = db.restaurant.findUnique({
    where: { slug },
  });
  return restaurant;
};
