import React from "react";
import { makePayment } from "./api/payment";

function App() {
  return (
    <div>
      Tax Calculator App
      <div>
        <button
          onClick={async () => {
            try {
              const checkoutURL = await makePayment();
              window.location.href = checkoutURL;
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Pay
        </button>
      </div>
    </div>
  );
}

export default App;
