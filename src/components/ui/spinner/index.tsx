import { keyframes } from "@emotion/react";
import { css, cx } from "@styled-system/css";
import type React from "react";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const getSizeStyles = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css({
        width: "20px",
        height: "20px",
        borderWidth: "2px",
      });
    case "large":
      return css({
        width: "60px",
        height: "60px",
        borderWidth: "4px",
      });
    default:
      return css({
        width: "40px",
        height: "40px",
        borderWidth: "3px",
      });
  }
};

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  const sizeStyles = getSizeStyles(size);

  const spinnerStyle = css({
    display: "inline-block",
    border: "solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTopColor: "#000",
    animation: `${spin} 1s ease-in-out infinite`,
  });

  return <div className={cx(spinnerStyle, sizeStyles)} />;
};

export default Spinner;
