import { useParams } from "react-router-dom";
import RecentProduct from "../Components/Display/RecentProduct";

function AllProducts() {
    const { categoryId, subCategoryId } = useParams();
    
    return (
        <>  
            <h1>{categoryId}</h1>
            <h1>{subCategoryId}</h1>

            {/* <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                <RecentProduct />
            </div> */}
        </>
    );
}

export default AllProducts;