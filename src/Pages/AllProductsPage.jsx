import { useParams } from "react-router-dom";
import RecentProduct from "../Components/Display/RecentProduct";

function AllProducts() {
    const { categoryId, subCategoryId } = useParams();

    return (
        <>
            {
                !categoryId ? (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <h1>All Products</h1>
                    </div>
                ) : categoryId && !subCategoryId ? (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <h1>Category {categoryId} Products</h1>
                    </div>
                ) : (
                    <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                        <h1>Sub Category {subCategoryId} Products</h1>
                    </div>
                )
            }
        </>
    );
}

export default AllProducts;