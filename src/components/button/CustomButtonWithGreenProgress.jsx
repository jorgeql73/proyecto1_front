import React, { useState } from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import clsx from "clsx";

const CustomButtonWithGreenProgress = ({
    variant = "contained",
    color = "primary",
    size = "medium",
    className,
    onClick,
    children,
    ...props
  }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const handleClick = async () => {
      if (onClick) {
        setLoading(true);
        try {
          await onClick(); // Espera a que la función de clic se complete
          setSuccess(true);
        } catch (error) {
          console.error("Error en la acción del botón:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
            setSuccess(false);
          }, 3000); // Reinicia el estado tras 3 segundos
        }
      }
    };
  
    const tailwindStyles = clsx(
      "relative rounded-md font-semibold shadow-sm flex items-center justify-center overflow-hidden",
      className,
      {
        "py-2 px-4": size === "medium",
        "py-1 px-3": size === "small",
        "py-3 px-5": size === "large",
      }
    );
  
    return (
      <div className="relative inline-block w-full">
        {/* Botón principal */}
        <Button
          variant={variant}
          color={success ? "success" : color}
          className={tailwindStyles}
          onClick={handleClick}
          {...props}
          disabled={loading } // Deshabilita el botón mientras carga o está en éxito
        >
          {success ? (
            <CheckCircleIcon fontSize="small" className="text-white" />
          ) : (
            <span className="relative z-10">{children}</span>
          )}
  
          {/* Barra de carga verde */}
          {loading && (
            <div
              className="absolute bottom-0 left-0 h-1 w-full animate-progress"
              style={{ backgroundColor: "#4caf50" }} // Verde Material Design
            ></div>
          )}
        </Button>
      </div>
    );
  };

export default CustomButtonWithGreenProgress;