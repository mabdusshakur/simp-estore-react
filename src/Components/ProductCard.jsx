import http from "../axios";

function ProductCard(props) {
    const { id, name, price } = props;
    const trimmedName = name.substring(0, 30);

    const handleAddToCart = () => {
        http.post('/carts', { product_id: props.id, quantity: 1 }).then((res) => {
            console.log(res);
        }).catch((err) => { console.log(err); });
    };
    return (
        <>
            <div className="max-w-60 mx-1 my-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                <a href="#">
                    <img className="p-1 rounded-t-lg" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D" alt="product image" />
                </a>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{trimmedName}</h5>
                    </a>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                        <button onClick={handleAddToCart} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;