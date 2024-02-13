import { CSSProperties } from "react";

const ArrowDown = ({
  strokeColor,
}: {
  strokeColor: CSSProperties["color"];
}) => {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.19043 -2.18557e-07L6.19043 13.4243M6.19043 13.4243L1.19043 8.42431M6.19043 13.4243L11.1904 8.42431"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ArrowDown;
