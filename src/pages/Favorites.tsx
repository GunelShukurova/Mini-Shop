import { IoIosStar } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useFavorites from "../context/FavoritesContext/favoritesContext";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const renderRatingStars = (rating: number) => (
    <div className="text-amber-300 flex text-lg">
      {Array.from({ length: 5 }, (_, i) => (
        <IoIosStar
          key={i}
          className={i < rating ? "fill-current" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <div className="px-5 md:px-20 mt-10">
      <h2 className="text-3xl font-extrabold text-center mt-10">FAVORITES</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10 justify-items-center">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="flex flex-col cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative w-full sm:w-80">
                <img
                  className="w-full rounded-2xl"
                  src={product.image}
                  alt={product.name}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  {isFavorite(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
              </div>
              <div className="mt-5 flex flex-col">
                <span className="font-semibold">{product.name}</span>
                <div className="flex gap-2 items-center">
                  {renderRatingStars(product.rating)}
                  <span className="text-sm text-gray-600">{product.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">
                    $
                    {product.sale
                      ? product.price - (product.price * product.sale) / 100
                      : product.price}
                  </span>
                  {product.sale ? (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.price}
                      </span>
               <span className="text-xs font-semibold text-red-500 bg-red-200 px-2 rounded-full py-1">
                        -{product.sale}%
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
