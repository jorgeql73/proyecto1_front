import React from "react";
import Button from "@mui/material/Button";
import clsx from "clsx";

// Props para personalizar el botón
const CustomButton = ({ variant = "contained", color = "primary", size = "medium", className, children, ...props }) => {
  const tailwindStyles = clsx(
    "rounded-md font-semibold shadow-sm",
    className, // Para estilos personalizados de Tailwind
    {
      "py-2 px-4": size === "medium",
      "py-1 px-3": size === "small",
      "py-3 px-5": size === "large",
    }
  );

  return (
    <Button
      variant={variant}
      color={color}
      className={tailwindStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;