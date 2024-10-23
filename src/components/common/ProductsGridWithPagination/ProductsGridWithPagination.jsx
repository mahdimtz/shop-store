import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton"
import { Link } from "react-router-dom";
import {getProductsApi} from "../../../utils/apis/products/getProductsApi"
import { Pagination } from "@mui/material";

const ProductsGridWithPagination = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const limit = 6;
  const total = 200; // backend in response should provide total page ,total items and ....
  const { isPending, error, data } = useQuery({
    queryKey: ["products",currentPage],
    queryFn: () => getProductsApi((currentPage - 1)* limit ,limit),
  });
  return (
    <div className="flex flex-wrap gap-4 px-8 justify-center items-center my-8">
        {isPending && Array.from("123456").map(item=><ProductGridSkeleton key={item}/>)}
      {data &&
        data?.data?.map((product,index) => (
         
          <Link
          key={product?.id} to={`/products/${product.id}`}
           className="rounded-xl flex flex-col gap-4 shadow-lg items-center justify-center pb-4 lg:w-3/12 w-5/12">
            <img className="w-full  rounded-t-xl h-[15rem] " src={product?.images[0].replace(/^["[]+|["\]]/g)}/>
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </Link>
        ))}
        {data && (<div className="my-8" dir="ltr"><Pagination onChange={(e,value)=>setCurrentPage(value)}  defaultPage={currentPage} count={Math.ceil(total/limit)} size="large"/></div>)}
    </div>
  );
};

export default ProductsGridWithPagination;
