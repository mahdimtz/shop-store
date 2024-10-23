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
    <div className="flex flex-wrap gap-4 px-8 justify-center items-center my-8">
        {isPending && Array.from("123456").map(item=><ProductGridSkeleton key={item}/>)}
      {data &&
        data?.data.map((product,index) => (
         
          <Link
          key={product?.id} to={`/products/${product.id}`}
           className="rounded-xl flex flex-col gap-4 shadow-lg items-center justify-center pb-4 lg:w-3/12 w-5/12">
            <img className="w-full  rounded-t-xl h-[15rem] " src={product?.images[0].replace(/^["[]+|["\]]/g)}/>
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </Link>
        ))}
    </div>
  );
};

export default ProductByCategoryGrid;
