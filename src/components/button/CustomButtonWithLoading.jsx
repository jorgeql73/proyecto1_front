import React, { useState } from "react";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import clsx from "clsx";

const CustomButtonWithProgress = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  className,
  onClick,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      setProgress(0);
      try {
        // Simula una barra de progreso en intervalos
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10; // Incremento del progreso
          });
        }, 200);

        await onClick(); // Espera a que la acción del clic se complete
        setSuccess(true);
      } catch (error) {
        console.error("Error en la acción del botón:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setProgress(0);
        }, 3000); // Reinicia el estado después de 3 segundos
      }
    }
  };

  const tailwindStyles = clsx(
    "rounded-md font-semibold shadow-sm flex items-center justify-center",
    className, // Para estilos personalizados de Tailwind
    {
      "py-2 px-4": size === "medium",
      "py-1 px-3": size === "small",
      "py-3 px-5": size === "large",
    }
  );

  return (
    <div className="relative w-full">
      {/* Botón principal */}
      <Button
        variant={variant}
        color={success ? "success" : color}
        className={clsx(tailwindStyles, "w-full")}
        onClick={handleClick}
        {...props}
        disabled={loading || success} // Deshabilita el botón mientras carga o está en éxito
      >
        {success ? (
          <CheckCircleIcon fontSize="small" className="text-green-500" />
        ) : (
          children
        )}
      </Button>

      {/* Barra de progreso */}
      {loading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          className="absolute bottom-0 left-0 w-full h-4"
        />
      )}
    </div>
  );
};

export default CustomButtonWithProgress;