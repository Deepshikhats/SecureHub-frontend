import React from "react";
import { RotatingLines } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({ label, isLoading, ...rest }) => {
  return (
    <button
      className="outline-none rounded-2xl flex justify-center bg-green-700 text-white py-1 px-3 text-sm font-semibold hover:bg-green-600"
      {...rest}
    >
      {isLoading ? (
        <RotatingLines
          visible={true}
          width="15"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
