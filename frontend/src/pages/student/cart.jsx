import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/cartContext";
import CartItem from "../../components/student/CartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import orderService from "../../services/orderService";
import Toast from "../../components/common/Toast";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const goHome = () => {
    window.location.href = `${BACKEND_URL}/home`; // ✅ back to EJS home
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      setLoading(true);
      const orderPayload = {
        items: cartItems.map((item) => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
      };
      const order = await orderService.createOrder(orderPayload);
      clearCart();
      navigate("/order-success", { state: { orderId: order._id } });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Order failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
          <button
            onClick={goHome} // ✅ goes to EJS home
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-lg font-semibold text-gray-700">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                Clear All
              </button>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span className="font-medium text-gray-800">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition"
              >
                {loading ? "Placing Order..." : "Proceed to Checkout"}
              </button>

              <button
                onClick={goHome} // ✅ goes to EJS home
                className="mt-3 w-full text-sm text-gray-500 hover:text-orange-500 text-center transition"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;