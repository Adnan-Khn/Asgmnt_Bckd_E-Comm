import React, { useState } from "react";
import { useApi } from "../shared/useApi";
import { useNavigate } from "react-router";

const ProductCard = ({ product, getAllProds }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const api = useApi();
  const navigate = useNavigate()
  // API returns images as objects with { url, fileId, _id }
  const images =
    product.images?.length > 0
      ? product.images.map((img) => img.url)
      : ["https://placehold.co/600x400/e8ddd0/8a6d4b?text=No+Image"];

  const hasMultiple = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this product");
    if (!confirm) return;

    try {
      const res = await api.delete(`/api/products/${id}`);
      console.log(res);
      await getAllProds();
      alert("Product deleted");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleUpdate =(id)=>{
    console.log(id)
    navigate("/home/add-product",{
        state:{
            product,
            isUpdate:true
        }
    })
  }

  const viewProd = (id)=>{
    navigate(`/home/products/${id}`)
  }
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-[#e8ddd0] bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#c4a882]/60 hover:shadow-xl hover:shadow-[#c4a882]/10 dark:border-[#2b241d] dark:bg-[#1a1613]/70 dark:hover:border-[#d4c4a8]/40 dark:hover:shadow-black/30">
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden">
        {/* Carousel track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} ${idx + 1}`}
              className="h-full w-full shrink-0 object-cover transition-transform duration-700 hover:scale-105"
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-[#2a241d]/70 px-3 py-1 text-xs font-medium text-[#f5efe6] backdrop-blur-md dark:bg-[#14110e]/70">
          {product.category}
        </span>

        {/* Eye icon — view product */}
        <button
          onClick={() => viewProd(product._id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#2a241d]/60 text-[#f5efe6] backdrop-blur-md transition-all duration-300 hover:bg-[#c4a882] hover:text-[#14110e] dark:bg-[#14110e]/60 dark:hover:bg-[#d4c4a8]"
          aria-label="View product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Carousel arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2a241d]/50 text-[#f5efe6] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-[#c4a882] hover:text-[#14110e] dark:bg-[#14110e]/50 dark:hover:bg-[#d4c4a8]"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2a241d]/50 text-[#f5efe6] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-[#c4a882] hover:text-[#14110e] dark:bg-[#14110e]/50 dark:hover:bg-[#d4c4a8]"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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

        {/* Dots indicator */}
        {hasMultiple && (
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImage
                    ? "w-5 bg-[#f5efe6]"
                    : "w-1.5 bg-[#f5efe6]/50 hover:bg-[#f5efe6]/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Stock badge over image bottom */}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${
            product.stock > 0
              ? "bg-emerald-500/20 text-emerald-100 border border-emerald-300/30"
              : "bg-red-500/20 text-red-100 border border-red-300/30"
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="truncate text-lg font-bold text-[#2a241d] dark:text-[#f5efe6]">
          {product.title}
        </h3>

        {/* Description — max 30 words */}
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#6b5e4f] dark:text-[#a89880]">
          {product.description}
        </p>

        {/* Price + actions */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-[#8a7d6b] dark:text-[#6b5e4f]">
              Price
            </span>
            <span className="text-xl font-extrabold text-[#8a6d4b] dark:text-[#d4c4a8]">
              ₹{product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Update button */}
            <button
              onClick={()=>handleUpdate(product._id)}
              className="group/btn flex h-9 w-9 items-center justify-center rounded-lg border border-[#e0d6c8] bg-white/60 text-[#8a6d4b] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c4a882] hover:bg-[#c4a882] hover:text-[#14110e] hover:shadow-md hover:shadow-[#c4a882]/25 dark:border-[#2b241d] dark:bg-[#221c17]/60 dark:text-[#d4c4a8] dark:hover:border-[#d4c4a8] dark:hover:bg-[#d4c4a8] dark:hover:text-[#14110e]"
              aria-label="Update product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            {/* Delete button */}
            <button
              onClick={() => handleDelete(product._id)}
              className="group/btn flex h-9 w-9 items-center justify-center rounded-lg border border-[#e0d6c8] bg-white/60 text-[#8a7d6b] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-red-500/25 dark:border-[#2b241d] dark:bg-[#221c17]/60 dark:text-[#a89880] dark:hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white"
              aria-label="Delete product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-[#c4a882] to-[#8a6d4b] transition-all duration-500 group-hover:w-full dark:from-[#d4c4a8] dark:to-[#b8a88a]" />
    </div>
  );
};

export default ProductCard;
