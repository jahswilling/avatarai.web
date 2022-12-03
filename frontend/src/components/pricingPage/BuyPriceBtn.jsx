import React from "react";
import Button from "../landingPage/Button/Button";

function BuyPriceBtn({ top, background, text }) {
  return (
    <div
      style={{
        "margin-bottom": top,
        "background-color": background,
        color: text,
      }}
      className="w-full text-center p-2 rounded-lg"
    >
      <Button> Buy this plan</Button>
    </div>
  );
}

export default BuyPriceBtn;
