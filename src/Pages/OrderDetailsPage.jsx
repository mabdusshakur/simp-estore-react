function OrderDetails() {
    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <p className="text-sm underline">Orderer Name : </p>
                    <p className="text-sm underline">Orderer Email : </p>
                    <p className="text-sm underline">Orderer Phone : </p>
                    <p className="text-sm underline">Orderer Address_1 : </p>
                    <p className="text-sm underline">Orderer Address_2 : </p>
                    <p className="text-sm underline">Orderer City : </p>
                    <p className="text-sm underline">Orderer Country : </p>
                    <p className="text-sm underline">Orderer Postal-Code : </p>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;