import DeleteIcon from "@mui/icons-material/Delete";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import useBasket from "../context/CartContext/cartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useBasket();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountTotal = cart.reduce((sum, item) => {
    if (!item.sale) return sum;
    return sum + ((item.price * item.sale) / 100) * item.quantity;
  }, 0);
  const discountPercent = subtotal
    ? Math.round((discountTotal / subtotal) * 100)
    : 0;
  const deliveryFee = cart.length ? 14 : 0;
  const total = subtotal - discountTotal + deliveryFee;
  return (
    <div className="px-5 md:px-20 2xl:px-80 mt-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-center lg:text-left mb-10">
        YOUR CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 max-h-[700px]">
        <div className="flex-1 border border-gray-300 rounded-2xl p-5 bg-white shadow-md overflow-y-auto">
          <div className="flex flex-col gap-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 sm:items-center"
              >
                <img
                  className="w-full sm:w-40 rounded-2xl object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between items-start sm:items-center">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  <div className="flex gap-4 text-gray-700">
                    <span>Size:</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="flex gap-4 text-gray-700">
                    <span>Color:</span>
                    <span>{item.color}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          $
                          {item.sale
                            ? item.price - (item.price * item.sale) / 100
                            : item.price}
                        </span>
                        {item.sale ? (
                          <>
                            <span className="text-xl text-gray-400 line-through">
                              ${item.price}
                            </span>
                            <span className="text-xs font-semibold text-red-500 bg-red-200 px-2 rounded-full py-1">
                              -{item.sale}%
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-gray-100 px-4 py-1 rounded-full w-28 text-xl">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <GoPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-116 border border-gray-300 rounded-2xl p-5 bg-white shadow-md flex-shrink-0 h-100">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Discount (-{discountPercent}%)</span>
            <span className="font-semibold text-red-600">
              -${discountTotal}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span className="font-semibold">${deliveryFee}</span>
          </div>

          <div className="border-t border-gray-200 mt-2"></div>

          <div className="flex justify-between text-lg sm:text-xl font-bold mt-2">
            <span>Total</span>
            <span className="font-semibold">${total}</span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <input
              className="h-12 w-full sm:flex-1 bg-gray-100 rounded-full pl-4 pr-4 text-base placeholder-gray-400"
              type="text"
              placeholder="Add promo code"
            />
            <button className="h-12 sm:flex-1 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
              Apply
            </button>
          </div>
          <button className="w-full mt-3 h-12 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
