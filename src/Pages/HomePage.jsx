import MostSoldProduct from "../Components/Display/MoseSoldProduct";
import RecentProduct from "../Components/Display/RecentProduct";

function Home() {
    return (
        <>
            <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                <h1 className="text-xl text-white px-7 py-2">Recent Products:</h1>
                <RecentProduct />
            </div>
            <div className="container mx-auto mt-2 bg-gray-800 rounded-xl">
                <h1 className="text-xl text-white px-7 py-2">Most Sold Products:</h1>
                <MostSoldProduct />
            </div>
        </>
    );
}

export default Home;