import { useEffect, useState } from "react";
import http from "../axios";

function AddProductComponent() {

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
           
        </>
    );
}

export default AddProductComponent;