import React from "react";
import useStore from "../../../store";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Header = () => {
  const { access_token } = useStore();
  return (
    <header className="px-4 my-4">
      <div className="flex justify-between items-center bg-slate-600 p-4 text-slate-50 rounded-xl shadow-md">
        <Link to="/" className="flex gap-1 items-center">
          <span>فروشگاه </span>
          <StorefrontIcon />
        </Link>
        <Link to={`/${access_token !=null && access_token != undefined ? "dashboard":"login"}`}  className="bg-slate-500 px-4 py-2 rounded-md inline-flex gap-2 items-center justify-center">
          {" "}
          {access_token != null && access_token != undefined ? (
            <>
              <span>داشبورد</span>
              <PermIdentityIcon />
            </>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>ورود</span>
              <LoginIcon />
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
