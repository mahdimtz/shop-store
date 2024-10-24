import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../../../utils/apis/products/getProductByCategory";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton"
import { Link } from "react-router-dom";

const ProductByCategoryGrid = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => getProductByCategory(id),
  });
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5 mx-4">
        {isPending && Array.from("1234").map(item=><ProductGridSkeleton key={item}/>)}
      {data &&
        data?.data.map((product,index) => (
         
          <Link
          key={product?.id} to={`/products/${product.id}`}
           className="rounded-xl flex flex-col gap-5 overflow-hidden shadow-lg mx-auto ">
            <img className="rounded-t-xl" loading="lazy" width="550" height="100" src={product?.images[0].replace(/^["[]+|["\]]/g)}/>
            <div className="flex flex-col flex-grow items-center ">
            <p className="mb-5 text-gray-700 text-center">{product?.title}</p>
            <p className="mb-5 text-gray-800 font-bold ">{product?.price}$</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductByCategoryGrid;
