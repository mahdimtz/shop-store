import React from "react";
import { Avatar } from "@mui/material";
import {Chip} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../../../utils/apis/categories/getCategoriesApi";
import CategoriesChipsSkeleton from "../../skeleton/CategoriesChipsSkeleton/CategoriesChipsSkeleton";
import ErrorOnFetchApi from "../../common/ErrorOnFetchApi"
import { Link } from "react-router-dom";


const CategoriesChips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn:()=>getCategoriesApi(),
    
    
  })
  
  return (
    <div className="mx-4 flex  gap-4 overflow-x-auto pb-4 ">
      {isPending && Array.from("123456").map(item =><CategoriesChipsSkeleton/>)}
      {error && <ErrorOnFetchApi/>}
    {data && 
     data?.data?.map(category =>(
       
     <Link key={category?.id} to={`/categories/${category.id}`}  className="flex">
      <Chip 
      sx={{height:"5rem"}}
      key={category?.id}
        avatar={<Avatar sx={{width:"4rem !important",height:"4rem !important",marginRight:"10px !important"}} alt={`${category.name} image`} src={category?.image} />}
        label={category?.name}
        variant="outlined"
      />
     </Link>
    ))}
    
    </div>
  );
};

export default CategoriesChips;
