import React, { useEffect } from "react";
import { useApi } from "../shared/useApi";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const AddProductPage = () => {
  const api = useApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      images: [],
      size: "Not Applicable",
      stock: "",
      category: "",
    },
  });

  const location = useLocation();
  //console.log(location);
  const product = location.state?.product;
  const isUpdate = location.state?.isUpdate;

  useEffect(() => {
    if (isUpdate && product) {
      reset({
        title: product.title || "",
        description: product.description || "",
        images: [],
        price: product.price || "",
        size: product.size || "Not Applicable",
        stock: product.stock || "",
        category: product.category || "",
      });
    }
  }, [isUpdate, product, reset]);

  const createProd = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("size", data.size);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      //for image
      if (data.images?.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await api.post("/api/products", formData);
      console.log(res);
      alert("Product created");
      navigate("/home/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  const updateProd = async (data) => {
    try {
      const res = await api.put(`/api/products/${product._id}`, {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        category: data.category,
        size: data.size,
      });
      console.log(res);
      alert("Product Updated");
      navigate("/home/products");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  const onSubmit = async (data) => {
    isUpdate ? await updateProd(data) : await createProd(data);
  };
  return (
    <div className="min-h-screen bg-[#faf6ef] px-6 py-16 text-[#2a241d] transition-colors duration-300 dark:bg-[#14110e] dark:text-[#e8ddd0]">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 border-b border-[#e8ddd0] pb-8 dark:border-[#2b241d]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#8a6d4b] dark:text-[#d4c4a8]">
              {isUpdate ? "Edit" : "New"}
            </span>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2a241d] dark:text-[#f5efe6]">
              {isUpdate ? (
                <>
                  Update{" "}
                  <span className="text-[#8a6d4b] dark:text-[#d4c4a8]">
                    Product
                  </span>
                </>
              ) : (
                <>
                  Add{" "}
                  <span className="text-[#8a6d4b] dark:text-[#d4c4a8]">
                    Product
                  </span>
                </>
              )}
            </h1>

            <p className="mt-3 text-base leading-7 text-[#6b5e4f] dark:text-[#a89880]">
              {isUpdate
                ? "Update your product details"
                : "Add a new product to your store"}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#e8ddd0] bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 dark:border-[#2b241d] dark:bg-[#1a1613]/70">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                Product Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className="w-full rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] placeholder-[#a89880] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:placeholder-[#6b5e4f] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
              />

              {errors.title && (
                <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter product description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                })}
                className="w-full resize-none rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] placeholder-[#a89880] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:placeholder-[#6b5e4f] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
              />

              {errors.description && (
                <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price + Stock */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="₹ Enter price"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] placeholder-[#a89880] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:placeholder-[#6b5e4f] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
                />

                {errors.price && (
                  <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  {...register("stock", {
                    required: "Stock is required",
                    min: {
                      value: 0,
                      message: "Stock cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] placeholder-[#a89880] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:placeholder-[#6b5e4f] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
                />

                {errors.stock && (
                  <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category + Size */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full cursor-pointer rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
                >
                  <option value="">Select category</option>
                  <option value="tshirt">T-Shirt</option>
                  <option value="shirt">Shirt</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="jeans">Jeans</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>

                {errors.category && (
                  <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Size */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                  Size
                </label>

                <select
                  {...register("size")}
                  className="w-full cursor-pointer rounded-lg border border-[#e0d6c8] bg-white px-4 py-3 text-[#2a241d] outline-none transition-all duration-300 focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 dark:border-[#3a322a] dark:bg-[#221c17] dark:text-[#e8ddd0] dark:focus:border-[#d4c4a8] dark:focus:ring-[#d4c4a8]/20"
                >
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>

            {/* Images */}
            {!isUpdate && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4a3f33] dark:text-[#c4b5a0]">
                  Product Images
                </label>

                <div className="rounded-xl border-2 border-dashed border-[#e0d6c8] bg-white/50 p-6 text-center transition-colors duration-300 hover:border-[#c4a882] dark:border-[#3a322a] dark:bg-[#221c17]/50 dark:hover:border-[#d4c4a8]/50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images", {
                      validate: (files) =>
                        files?.length <= 5 || "Maximum 5 images are allowed",
                    })}
                    className="mx-auto block w-full cursor-pointer text-sm text-[#6b5e4f] file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#c4a882] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#14110e] file:transition-colors hover:file:bg-[#b09872] dark:text-[#a89880] dark:file:bg-[#d4c4a8] dark:file:text-[#14110e] dark:hover:file:bg-[#e0d2b8]"
                  />

                  <p className="mt-3 text-xs text-[#8a7d6b] dark:text-[#6b5e4f]">
                    You can upload up to 5 images
                  </p>

                  {errors.images && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                      {errors.images.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#2a241d] px-6 py-3.5 font-semibold text-[#f5efe6] shadow-lg shadow-[#2a241d]/10 transition-all duration-300 hover:bg-[#14110e] hover:shadow-xl hover:shadow-[#2a241d]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#d4c4a8] dark:text-[#14110e] dark:shadow-[#d4c4a8]/10 dark:hover:bg-[#e0d2b8] dark:hover:shadow-[#d4c4a8]/20"
            >
              {isSubmitting
                ? "Please wait..."
                : isUpdate
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
