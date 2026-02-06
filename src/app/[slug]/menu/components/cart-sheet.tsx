import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Carrinho</SheetTitle>
        </SheetHeader>
        <div className="py-3">
          {products.map((product) => (
            <div className="py-2">
              <CartProductItem key={product.id} product={product} />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
