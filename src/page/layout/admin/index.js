import { Navigate } from "react-router-dom";
import { useAppContext } from "../../../context/useContext";
import { Admin } from "../../../components";
const AdminPages =()=>{
    const {user} = useAppContext();
    
    if(user.role !== 'Admin') return <Navigate to="/"/>;
    return <Admin />
}

export default AdminPages;