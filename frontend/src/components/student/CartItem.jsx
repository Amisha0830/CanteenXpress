import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {item.quantity} × ₹{item.price}
        </p>
      </div>
      <div className="font-semibold">
        ₹{item.quantity * item.price}
      </div>
    </div>
  );
};

export default CartItem;