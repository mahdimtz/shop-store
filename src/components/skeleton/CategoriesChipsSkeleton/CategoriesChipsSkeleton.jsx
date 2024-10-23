import React from "react";
import { Avatar } from "@mui/material";
import {Chip} from "@mui/material";

const CategoriesChipsSkeleton = () => {
  
  return (
    <div className="mx-4 flex flex-wrap gap-4 ">
        <div className="p-2 flex items-center gap-2 bg-slate-100 rounded-md">
            <div className="w-[3rem] h-[3rem] bg-slate-400 animate-pulse rounded-full "></div>
            <div className="w-[4rem] h-[1rem] bg-slate-400 animate-pulse rounded-lg "></div>
        </div>
    
    </div>
  );
};

export default CategoriesChipsSkeleton;
