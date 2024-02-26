import { Outlet } from "react-router-dom";
import { isLoggedIn } from "./services/AuthServices";

export const Admin=()=>{
    if (isLoggedIn) {
       return <Outlet/>;
        
    }else{
       return "user not log in";
    }

}