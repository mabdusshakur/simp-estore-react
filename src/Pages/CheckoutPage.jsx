import { useEffect, useState } from "react";
import http from "../axios";
import { loadStripe } from '@stripe/stripe-js/pure';
loadStripe.setLoadParameters({ advancedFraudSignals: false });

function Checkout() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [stripe, setStripe] = useState([]);
    const [elements, setElements] = useState([]);

    let clientSecretGlobal = '';

    const order_button = document.getElementById("order_button");
    const stripe_pay_now_button = document.getElementById("stripe_pay_now_button");
    const payment_ui = document.getElementById("payment_ui");

    const paymentMethods = [
        { value: 'stripe_intent', label: 'Stripe Intend' },
        { value: 'cod', label: 'Cash on Delivery' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await http.get(`/carts`).then((res) => {
            const response = res.data.data;
            const totalPrice = response.reduce((total, cart) => {
                const price = cart.product.sale_price !== 0 ? cart.product.sale_price : cart.product.regular_price;
                return total + price * cart.quantity;
            }, 0);
            setCart(response);
            setTotalPrice(totalPrice);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleStripePayment = async () => {
        const stripe = await loadStripe('pk_test_51LWDmKBlMv1Fu93l9f0SuOpTcsUzWTKwIvxLcHgdplCPk8PTmiiPLsUGOHHh6VbM5wXI1WZhUx73ocSP7DGn26eQ00giqXPUeG');
        setStripe(stripe);

        const elements = stripe.elements({
            clientSecret: clientSecretGlobal,
        });
        setElements(elements);

        const paymentElement = elements.create('payment');
        paymentElement.mount(payment_ui);

        order_button.hidden = true;
        stripe_pay_now_button.hidden = false;
    };

    const confirmStripePayment = async (stripe, elements) => {
        const paymentResult = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
                return_url: `${window.location.origin}/payment-confirmation`,
            },
        });

        if (paymentResult.error) {
            console.info("Error confirming payment:", paymentResult.error.message);
        }
        const { status, id } = paymentResult.paymentIntent;
        if (status === 'succeeded') {
            const data = {
                payment_intent_client_id: id,
            };
            http.post(`orders/confirm-stripe-intent-payment`, data).then((res) => {
                const response = res.data;
                console.info(response);
                if (response.succeeded === true) {
                    alert('Payment success');
                    fetchData();
                }
            }).catch((err) => { console.log(err); });
        }
    };

    const handlePlaceOrder = (e) => {
        if (paymentMethod === '') {
            alert('Please select payment method');
            return;
        }
        const data = {
            status: "pending",
            payment_method: "stripe_intent",
        };

        order_button.disabled = true;
        order_button.innerText = 'Please wait...';

        http.post('/orders', data).then((res) => {
            const response = res.data;
            if (response.status === 'success') {
                const secret = response.client_secret;
                clientSecretGlobal = secret;
                handleStripePayment();
            }
        }).catch((err) => { console.log(err); });
    };

    return (
        <>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {
                            cart.map((cart, index) => {
                                return (
                                    <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cart.product.images[0].path.replace(/\\\\/, '\\')} alt="product-image" width="500" />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">{cart.product.name}</span>
                                            <span className="float-right text-gray-400">{cart.quantity}</span>
                                            <p className="text-lg font-bold">${(cart.product.sale_price != 0 ? cart.product.sale_price : cart.product.regular_price) * cart.quantity}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="mt-8 text-lg font-medium">Payment Methods : </p>
                    <form className="mt-5 grid gap-6">
                        {
                            paymentMethods.map((paymentMethod, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <input className="peer hidden" id={paymentMethod.value} name="payment_method" type="radio" value={paymentMethod.value} onChange={e => setPaymentMethod(e.target.value)} />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor={paymentMethod.value}>
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">{paymentMethod.label}</span>
                                            </div>
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </form>
                    <div id="payment_ui" className="mt-2 p-2"></div>
                    <div className="">
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">${totalPrice}.00</p>
                        </div>
                    </div>
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handlePlaceOrder} id="order_button">Place Order</button>
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={() => confirmStripePayment(stripe, elements)} id="stripe_pay_now_button" hidden>Pay Now</button>
                </div>
            </div>
        </>
    );
}

export default Checkout;