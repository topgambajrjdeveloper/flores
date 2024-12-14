"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { urlForImage } from "@/lib/sanity.image";
import { useCart } from "@/contexts/cart-context";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, addToCart, getCartTotal } = useCart();

  const updateQuantity = (productId: string, newQuantity: number) => {
    const item = cart.find(item => item.product._id === productId);
    if (item) {
      if (newQuantity > item.quantity) {
        addToCart(item.product, newQuantity - item.quantity);
      } else if (newQuantity < item.quantity) {
        removeFromCart(productId);
        if (newQuantity > 0) {
          addToCart(item.product, newQuantity);
        }
      }
    }
  };

  const totalPrice = getCartTotal();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cart.map((item) => (
            <div key={item.product._id} className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                {item.product.images && item.product.images.length > 0 && (
                  <Image
                    src={urlForImage(item.product.images[0]).width(64).height(64).url()}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.product.price.toFixed(2)} €
                </p>
                <div className="flex items-center mt-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.product._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-8">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{totalPrice.toFixed(2)} €</span>
            </div>
            <Button className="w-full">Proceder al pago</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;