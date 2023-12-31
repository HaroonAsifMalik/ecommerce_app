import AddToCartButton from "Components/UI/AddToCartButton";
import BuyNow from "Components/UI/BuyNow";
import ViewHereBtn from "Components/UI/ViewHereBtn";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "store/modules/product";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { slug } = product;
  const PRODUCT_URL = "products/" + slug;
  const carts = useSelector((state) => state.products.carts);

  const checkSameItem = () => {
    return carts.some((cartItem) => cartItem.item.id === product.id);
  };

  const moveToCart = () => {
    const itemExistsInCart = checkSameItem();
    if (carts.length > 0 && itemExistsInCart)
      addToast("Already addded", { appearance: "error", autoDismiss: true });
    else dispatch(addToCart({ item: product, count: 1 }));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-full mb-5">
        <Link
          href={{
            pathname: PRODUCT_URL,
            query: { id: product.id },
          }}
        >
          <a>
            {product.product_images ? (
              <Image
                width="100%"
                height="100%"
                layout="responsive"
                src={product.product_images[0].image}
                alt={product.name}
              />
            ) : (
              product.name
            )}
          </a>
        </Link>
        <div className="p-5 bg-indigo-100">
          <Link href={PRODUCT_URL}>
            <a>
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                {product.name}
              </h5>
            </a>
          </Link>
          <p className="font-sm text-gray-700 mb-3">
            {product?.short_description}
          </p>
          <p className="text-bold text-yellow-700 font-extrabold text-xl pb-1">
            <span>&#8377; </span>
            {product?.price}
            <span className="text-xs text-green-600">
              {" "}
              {product.regular_price}
            </span>
          </p>

          <div className="px-5 py-2 flex flex-shrink grid-column justify-evenly gap-2 items-center">
            <AddToCartButton moveToCart={moveToCart} />
            <BuyNow />
            <ViewHereBtn
              name={product.name}
              image={product.product_images[0].image}
              price={product.regular_price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
