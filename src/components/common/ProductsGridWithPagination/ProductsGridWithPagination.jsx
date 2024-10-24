import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton"
import { Link } from "react-router-dom";
import {getProductsApi} from "../../../utils/apis/products/getProductsApi"
import { Pagination } from "@mui/material";

const ProductsGridWithPagination = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const limit = 9;
  const total = 200; // backend in response should provide total page ,total items and ....
  const { isPending, error, data } = useQuery({
    queryKey: ["products",currentPage],
    queryFn: () => getProductsApi((currentPage - 1)* limit ,limit),
  });
  return (
    <>
    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5 mx-4 my-5 ">
        {isPending && Array.from("1234").map(item=><ProductGridSkeleton key={item}/>)}
      {data &&
        data?.data?.map((product,index) => (
         
          <Link
          key={product?.id} to={`/products/${product.id}`}
           className="rounded-xl flex flex-col gap-3 overflow-hidden shadow-lg mx-auto">
            <img className="rounded-t-xl" loading="lazy" src={product?.images[0].replace(/^["[]+|["\]]/g)}/>
            <div className="flex flex-col flex-grow items-center ">
            <p className="mb-5 text-center text-gray-700">{product?.title}</p>
            <p className="mb-5  text-gray-800 font-bold ">{product?.price}$</p>
            </div>
          </Link>
        ))}
        
    </div>
    {data && (<div className="my-8 flex justify-center" dir="ltr"><Pagination onChange={(e,value)=>{ window.scrollTo({ top: 0, behavior: "smooth" }); setCurrentPage(value)}}  defaultPage={currentPage} count={Math.ceil(total/limit)} size="small"/></div>)}
    </>
  );
};

export default ProductsGridWithPagination;
