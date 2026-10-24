import React, { useContext, useEffect } from "react";
import { useApi } from "../shared/useApi";
import { AuthContext } from "../state/AuthContext";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { products, setProducts } = useContext(AuthContext);
  //console.log(products);
  const api = useApi();

  const getAllProds = async () => {
    try {
      const res = await api.get("/api/products");
      //console.log("response", res);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProds();
  }, []);
  return (
    <div className="min-h-screen bg-[#faf6ef] px-6 py-16 text-[#2a241d] transition-colors duration-300 dark:bg-[#14110e] dark:text-[#e8ddd0]">
  <div className="mx-auto max-w-7xl">

    {/* Header */}
    <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[#e8ddd0] pb-8 sm:flex-row sm:items-end dark:border-[#2b241d]">
      <div>
        <span className="text-sm font-semibold uppercase tracking-widest text-[#8a6d4b] dark:text-[#d4c4a8]">
          Catalog
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2a241d] dark:text-[#f5efe6] sm:text-5xl">
          Explore all Products
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-[#6b5e4f] dark:text-[#a89880]">
          Built as a full-stack authentication and product CRUD project.
        </p>
      </div>

      {/* Product count pill */}
      {products?.length > 0 && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e0d6c8] bg-white/60 px-4 py-2 text-sm font-medium text-[#8a6d4b] backdrop-blur-sm dark:border-[#2b241d] dark:bg-[#221c17]/60 dark:text-[#d4c4a8]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4a882] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8a6d4b] dark:bg-[#d4c4a8]" />
          </span>
          {products.length} {products.length === 1 ? "product" : "products"}
        </span>
      )}
    </div>

    {/* Products grid / empty state */}
    <div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((prod) => {
            return (
              <ProductCard key={prod._id} product={prod} getAllProds = {getAllProds}/>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9cdbc] bg-white/40 px-6 py-24 text-center backdrop-blur-sm dark:border-[#3a322a] dark:bg-[#1a1613]/40">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5efe6] text-3xl shadow-inner dark:bg-[#2b241d]">
            📦
          </div>
          <h3 className="text-xl font-bold text-[#2a241d] dark:text-[#f5efe6]">
            No Products to show
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#6b5e4f] dark:text-[#a89880]">
            There are no products available right now. Add your first
            product to get started.
          </p>
        </div>
      )}
    </div>

  </div>
</div>
  );
};

export default ProductsPage;
