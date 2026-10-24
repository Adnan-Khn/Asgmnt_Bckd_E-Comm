import React, { useEffect, useState } from "react";
import { useApi } from "../shared/useApi";
import { useNavigate, useParams } from "react-router";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useApi();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this product");
    if (!confirm) return;

    try {
      const res = await api.delete(`/api/products/${id}`);
      console.log(res);
      alert("Product deleted");
      navigate("/home/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleUpdate = (id) => {
    console.log(id);
    navigate("/home/add-product", {
      state: {
        product,
        isUpdate: true,
      },
    });
  };

  const getProdById = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/products/${id}`);
      console.log(res.data);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf6ef] px-6 dark:bg-[#14110e]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e0d6c8] border-t-[#8a6d4b] dark:border-[#3a322a] dark:border-t-[#d4c4a8]" />
          <p className="text-sm font-medium text-[#8a7d6b] dark:text-[#a89880]">
            Wait while data is being loaded...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf6ef] px-6 dark:bg-[#14110e]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5efe6] text-3xl shadow-inner dark:bg-[#2b241d]">
            📦
          </div>
          <h2 className="text-2xl font-bold text-[#2a241d] dark:text-[#f5efe6]">
            No product found
          </h2>
          <button
            onClick={() => navigate("/home/products")}
            className="mt-2 rounded-xl bg-[#2a241d] px-6 py-2.5 text-sm font-semibold text-[#f5efe6] transition hover:bg-[#14110e] dark:bg-[#d4c4a8] dark:text-[#14110e] dark:hover:bg-[#e0d2b8]"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images.map((img) => img.url)
      : ["https://placehold.co/600x400/e8ddd0/8a6d4b?text=No+Image"];

  const hasMultiple = images.length > 1;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const stockStatus =
    product.stock > 0
      ? { label: "In Stock", color: "emerald" }
      : { label: "Out of Stock", color: "red" };

  return (
    <div className="min-h-screen bg-[#faf6ef] px-6 py-16 text-[#2a241d] transition-colors duration-300 dark:bg-[#14110e] dark:text-[#e8ddd0]">
      <div className="mx-auto max-w-6xl">
        {/* Top bar — Back button + Breadcrumb */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl border border-[#e0d6c8] bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#8a6d4b] backdrop-blur-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-[#c4a882] hover:bg-[#c4a882] hover:text-[#14110e] hover:shadow-md hover:shadow-[#c4a882]/25 dark:border-[#3a322a] dark:bg-[#221c17]/60 dark:text-[#d4c4a8] dark:hover:border-[#d4c4a8] dark:hover:bg-[#d4c4a8] dark:hover:text-[#14110e]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — Image Gallery */}
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl border border-[#e8ddd0] bg-white/70 shadow-sm backdrop-blur-sm dark:border-[#2b241d] dark:bg-[#1a1613]/70">
              <div
                className="flex h-full w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    className="h-full w-full shrink-0 object-cover"
                  />
                ))}
              </div>

              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#2a241d]/70 px-3 py-1 text-xs font-medium capitalize text-[#f5efe6] backdrop-blur-md dark:bg-[#14110e]/70">
                {product.category}
              </span>

              {hasMultiple && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2a241d]/50 text-[#f5efe6] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-[#c4a882] hover:text-[#14110e] dark:bg-[#14110e]/50 dark:hover:bg-[#d4c4a8]"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2a241d]/50 text-[#f5efe6] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-[#c4a882] hover:text-[#14110e] dark:bg-[#14110e]/50 dark:hover:bg-[#d4c4a8]"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {hasMultiple && (
                <span className="absolute bottom-4 right-4 rounded-full bg-[#2a241d]/70 px-3 py-1 text-xs font-medium text-[#f5efe6] backdrop-blur-md dark:bg-[#14110e]/70">
                  {currentImage + 1} / {images.length}
                </span>
              )}
            </div>

            {hasMultiple && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      idx === currentImage
                        ? "border-[#c4a882] shadow-md shadow-[#c4a882]/25 dark:border-[#d4c4a8]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#2a241d] dark:text-[#f5efe6] sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-[#c4a882] dark:text-[#d4c4a8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-[#8a7d6b] dark:text-[#6b5e4f]">
                  (4.8)
                </span>
              </div>

              <span className="h-4 w-px bg-[#e0d6c8] dark:bg-[#2b241d]" />

              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  product.stock > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`}
                />
                {stockStatus.label}
              </span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-[#8a6d4b] dark:text-[#d4c4a8]">
                ₹{product.price}
              </span>
              <span className="mb-1.5 text-lg text-[#a89880] line-through dark:text-[#6b5e4f]">
                ₹{Math.round(product.price * 1.25)}
              </span>
              <span className="mb-1.5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                20% OFF
              </span>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#8a6d4b] dark:text-[#d4c4a8]">
                Description
              </h2>
              <p className="text-base leading-7 text-[#6b5e4f] dark:text-[#a89880]">
                {product.description}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#e8ddd0] bg-white/50 px-4 py-3 dark:border-[#2b241d] dark:bg-[#1a1613]/50">
                <span className="text-xs uppercase tracking-wider text-[#8a7d6b] dark:text-[#6b5e4f]">
                  Category
                </span>
                <p className="mt-0.5 font-semibold capitalize text-[#2a241d] dark:text-[#f5efe6]">
                  {product.category}
                </p>
              </div>
              <div className="rounded-xl border border-[#e8ddd0] bg-white/50 px-4 py-3 dark:border-[#2b241d] dark:bg-[#1a1613]/50">
                <span className="text-xs uppercase tracking-wider text-[#8a7d6b] dark:text-[#6b5e4f]">
                  Size
                </span>
                <p className="mt-0.5 font-semibold text-[#2a241d] dark:text-[#f5efe6]">
                  {product.size}
                </p>
              </div>
              <div className="rounded-xl border border-[#e8ddd0] bg-white/50 px-4 py-3 dark:border-[#2b241d] dark:bg-[#1a1613]/50">
                <span className="text-xs uppercase tracking-wider text-[#8a7d6b] dark:text-[#6b5e4f]">
                  Stock
                </span>
                <p className="mt-0.5 font-semibold text-[#2a241d] dark:text-[#f5efe6]">
                  {product.stock} units
                </p>
              </div>
              <div className="rounded-xl border border-[#e8ddd0] bg-white/50 px-4 py-3 dark:border-[#2b241d] dark:bg-[#1a1613]/50">
                <span className="text-xs uppercase tracking-wider text-[#8a7d6b] dark:text-[#6b5e4f]">
                  Product ID
                </span>
                <p className="mt-0.5 truncate font-mono text-xs text-[#2a241d] dark:text-[#f5efe6]">
                  {product._id}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-xl border border-[#e0d6c8] bg-white dark:border-[#3a322a] dark:bg-[#221c17]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-lg font-bold text-[#8a6d4b] transition-colors hover:bg-[#f5efe6] dark:text-[#d4c4a8] dark:hover:bg-[#2b241d]"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-[#2a241d] dark:text-[#f5efe6]">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock || 1, q + 1))
                  }
                  className="flex h-12 w-12 items-center justify-center text-lg font-bold text-[#8a6d4b] transition-colors hover:bg-[#f5efe6] dark:text-[#d4c4a8] dark:hover:bg-[#2b241d]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                disabled={!product.stock}
                className="flex-1 rounded-xl bg-[#2a241d] px-8 py-3.5 font-semibold text-[#f5efe6] shadow-lg shadow-[#2a241d]/10 transition-all duration-300 hover:bg-[#14110e] hover:shadow-xl hover:shadow-[#2a241d]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#d4c4a8] dark:text-[#14110e] dark:shadow-[#d4c4a8]/10 dark:hover:bg-[#e0d2b8]"
              >
                Add to Cart
              </button>

              <button
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e0d6c8] bg-white text-[#8a6d4b] transition-all duration-300 hover:border-[#c4a882] hover:bg-[#c4a882] hover:text-[#14110e] dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#d4c4a8] dark:hover:border-[#d4c4a8] dark:hover:bg-[#d4c4a8] dark:hover:text-[#14110e]"
                aria-label="Add to wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#e8ddd0] pt-6 dark:border-[#2b241d]">
              {[
                { icon: "🚚", label: "Free Delivery" },
                { icon: "↩️", label: "7-Day Returns" },
                { icon: "🛡️", label: "Secure Payment" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-xs font-medium text-[#6b5e4f] dark:text-[#a89880]">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleUpdate(product._id)}
                className="flex-1 rounded-xl border border-[#e0d6c8] bg-white/60 px-4 py-3 text-sm font-semibold text-[#8a6d4b] transition-all duration-300 hover:border-[#c4a882] hover:bg-[#c4a882] hover:text-[#14110e] dark:border-[#3a322a] dark:bg-[#221c17]/60 dark:text-[#d4c4a8] dark:hover:border-[#d4c4a8] dark:hover:bg-[#d4c4a8] dark:hover:text-[#14110e]"
              >
                Update Product
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-300 hover:border-red-400 hover:bg-red-500 hover:text-white dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
