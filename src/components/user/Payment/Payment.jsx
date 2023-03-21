import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Payment() {
  const Navigate =useNavigate()
  const{name}=useSelector((state)=>state.userLogin)
    
    const initialOptions = {
        "client-id": "test",
        currency: "USD",
        intent: "capture",
        "data-client-token": "abc123xyz==",
    };
  return (
    <>
      <div className="mt-16">
        <div className=" p-5 md:px-40 py-10">
          <div className="bg-gray-100 mb-11 pb-10">
            <div className="flex flex-col items-center justify-center content-center  py-8">
              <h1 className="text-2xl font-serif  font-semibold">Payment</h1>
              <PayPalScriptProvider options={{ "client-id": "test"  }}>
                <PayPalButtons style={{ layout: "horizontal", mt:'25px'}} 
                 createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "700",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        
                        alert(`Transaction completed by ${name}`);
                        Navigate('/')
                    });
                }}
            />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
