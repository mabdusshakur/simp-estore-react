import { useParams } from "react-router-dom";
import RecentProduct from "../Components/Display/RecentProduct";
import AllProductsDisplay from "../Components/Display/AllProductsDisplay";

function AllProducts() {
    const { categoryId, subCategoryId } = useParams();

    return (
        <>
            {
                !categoryId ? (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <AllProductsDisplay />
                    </div>
                ) : categoryId && !subCategoryId ? (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <AllProductsDisplay categoryId={categoryId} />
                    </div>
                ) : (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <AllProductsDisplay categoryId={categoryId} subCategoryId={subCategoryId}/>
                    </div>
                )
            }
        </>
    );
}

export default AllProducts;