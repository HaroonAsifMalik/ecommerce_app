import Link from "next/link";
import CartItem from "Components/Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { resetCart } from "store/modules/product";
import { useToasts } from "react-toast-notifications";

const CartPage = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const carts = useSelector((state) => state.products.carts);
  const totalCartPrice = carts.reduce(
    (total, items) => total + items.item.regular_price * items.count,
    0
  );

  const checkOutHandler = () => {
    if (carts.length > 0) {
      dispatch(resetCart());
      addToast("Checkout Successfuly", {
        appearance: "success",
        autoDismiss: true,
      });
    } else
      addToast("No data in Cart", { appearance: "error", autoDismiss: true });
  };

  return (
    <div className=" bg-gray-300">
      <div className="py-12">
        <div className="max-w-md mt-5 mx-auto bg-white shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className=" md:grid md:grid-cols-3 gap-2">
                <div className="col-span-2 p-5">
                  <h1 className="text-2xl font-medium ">Shopping Cart</h1>
                  {carts.length > 0 ? (
                    <div>
                      {carts.map((items) => (
                        <CartItem
                          img={items.item.product_images[0].image}
                          name={items.item.product_type.name}
                          price={items.item.regular_price}
                          count={items.count}
                          id={items.item.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>Your cart is empty.</p>
                  )}

                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <div className="flex items-center">
                      <Link href="/products">
                        <a>
                          <i className="fa fa-arrow-left text-sm pr-2"></i>
                          <span className="text-md font-medium text-blue-500">
                            Continue Shopping
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <div className="flex justify-center items-center">
                      <button
                        className="h-12 w-full bg-yellow-500 rounded focus:outline-none text-black hover:bg-yellow-600 px-4"
                        onClick={checkOutHandler}
                      >
                        Check Out
                      </button>
                      <span className="text-sm font-medium text-gray-400 mr-1">
                        Subtotal:{" "}
                      </span>
                      <span className="text-lg font-bold text-gray-800 ">
                        ${totalCartPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" p-5 bg-gray-800 rounded overflow-visible">
                  <span className="text-xl font-medium text-gray-100 block pb-3">
                    Card Details
                  </span>
                  <span className="text-xs text-gray-400 ">Card Type</span>
                  <div className="overflow-visible flex justify-between items-center mt-2">
                    <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                      <span className="italic text-lg font-medium text-gray-200 underline">
                        VISA
                      </span>
                      <div className="flex justify-between items-center pt-4 ">
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-200">--------</span>
                        <span className="text-xs text-gray-200">--/--</span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                        width="40"
                        className="relative right-5"
                      />
                      <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
                        mastercard.
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center flex-col pt-3">
                    <label className="text-xs text-gray-400 ">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                      placeholder="Haroon"
                    />
                  </div>
                  <div className="flex justify-center flex-col pt-3">
                    <label className="text-xs text-gray-400 ">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                      placeholder="**** **** **** ****"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                    <div className="col-span-2 ">
                      <label className="text-xs text-gray-400">
                        Expiration Date
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="mm"
                        />
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="yyyy"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label className="text-xs text-gray-400">CVV</label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="XXX"
                      />
                    </div>
                  </div>
                  <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
