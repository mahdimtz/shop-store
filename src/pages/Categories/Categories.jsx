import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdApi } from "../../utils/apis/categories/getCategoryByIdApi";
import Header from "../../components/common/Header";
import CategoryInfoSkeleton from "../../components/skeleton/CategoryInfoSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import ProductByCategoryGrid from "../../components/common/ProductByCategoryGrid"
const Categories = () => {
  const { id } = useParams() || null;

  const { isPending, error, data } = useQuery({
    queryKey: ["categoriesById"],
    queryFn: () => getCategoryByIdApi(id),
  });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        {isPending && <CategoryInfoSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <>
            <img
              src={data?.data?.image}
              alt=""
              className="w-[8rem] h-[8rem] rounded-full"
            />
            <p className="font-bold">{data?.data?.name}</p>
            
          </>
        )}
      </div>
      {data && <ProductByCategoryGrid id={id}/>}
    </>
  );
};

export default Categories;
