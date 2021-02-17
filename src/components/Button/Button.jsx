import React from "react";
import { Button } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

const ButtonBase = ({ props, children, condition }) => {
  return (
    <Button
      {...props}
      style={{
        width: "100%",
        textTransform: "uppercase",
        fontWeight: "700",
        letterSpacing: "0.1px",
        fontSize: "14px",
        border: "none",
      }}
      icon={condition === "increase" ? <CaretDownFilled /> : <CaretUpFilled />}
    >
      {children}
    </Button>
  );
};

export default ButtonBase;