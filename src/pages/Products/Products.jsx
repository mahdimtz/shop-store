import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/apis/products/getProductById";
import Header from "../../components/common/Header";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";

const Products = () => {
    const[activeImage,setActiveImage] = useState(0)
  const { id } = useParams() || null;

  const { isPending, error, data } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(id),
  });
  return (
    <>
      <Header />

      <div className=" flex flex-col items-center justify-center gap-4 px-16">
        {isPending && <ProductSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <>
            <img
              className=" w-[15rem] h-[15rem] rounded-xl "
              src={data?.data?.images[activeImage].replace(/^["[]+|["\]]/g)}
            />
            <div className="flex gap-2 flex-wrap">
              {data?.data?.images.map((image,index) => (
                <img
                    onClick={()=>setActiveImage(index)}
                  key={image}
                  src={image.replace(/^["[]+|["\]]/g)}
                  className={`w-[5rem] h-[5rem] rounded-xl cursor-pointer border-4 ${activeImage == index ? "border-slate-400 shadow-lg":"border-transparent"}`}
                />
              ))}
            </div>
            <p className=" text-xl font-bold">{data?.data?.title}</p>
            <p className=" text-xl ">{data?.data?.price}$</p>
            <p className=" text-xl ">{data?.data?.description}</p>
            
          </>
        )}
      </div>
    </>
  );
};

export default Products;
