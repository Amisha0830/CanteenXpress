import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/cartContext"; // add this
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>        
        <AppRoutes />
      </CartProvider>       
    </AuthProvider>
  );
}