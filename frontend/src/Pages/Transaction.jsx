import React, { useState } from 'react';
import PayPal from '../Components/Paypal/PayPal';

const Transaction = () => {
    const [checkout, setCheckout] = useState(false);

    return (
        <div>
            {checkout ? (
                <PayPal />
            ) : (
            <button 
                onClick={() => {
                    setCheckout(true);
                }}
            >
                Checkout 
            </button>
            )}
        </div>
    );
};

export default Transaction;
