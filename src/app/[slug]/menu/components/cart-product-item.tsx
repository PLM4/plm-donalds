import Image from "next/image";
import { CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="truncate text-ellipsis text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button className="h-7 w-7 rounded-lg" variant="outline">
              <ChevronLeftIcon size={14} />
            </Button>
            <p className="w-6 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive">
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon size={14} />
      </Button>
    </div>
  );
};

export default CartProductItem;
