import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e titulo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl || "/placeholder-restaurant.png"}
          alt={restaurant?.name || "Restaurant Image"}
          width={82}
          height={82}
        />
        <h2 className="text-3xl font-semibold">{restaurant?.name}</h2>
      </div>
      {/* Bem vindo */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como aproveitar as suas refeições. Oferecemos praticidade e
          sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          option="DINE_IN"
          slug={slug}
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
        />
        <ConsumptionMethodOption
          option="TAKEAWAY"
          slug={slug}
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
