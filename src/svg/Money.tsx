import { CSSProperties } from "react";

const Money = ({ strokeColor }: { strokeColor: CSSProperties["color"] }) => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7826 6.71739C16.1854 6.71739 20.5652 5.54944 20.5652 4.1087C20.5652 2.66795 16.1854 1.5 10.7826 1.5C5.37982 1.5 1 2.66795 1 4.1087C1 5.54944 5.37982 6.71739 10.7826 6.71739Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5652 4.1087V8.02175C20.5652 9.45653 16.1304 10.6304 10.7826 10.6304C5.43478 10.6304 1 9.45653 1 8.02175V4.1087"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5652 8.02173V11.9348C20.5652 13.3696 16.1304 14.5435 10.7826 14.5435C5.43478 14.5435 1 13.3696 1 11.9348V8.02173"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2174 23.6739C26.6202 23.6739 31 22.506 31 21.0652C31 19.6245 26.6202 18.4565 21.2174 18.4565C15.8146 18.4565 11.4348 19.6245 11.4348 21.0652C11.4348 22.506 15.8146 23.6739 21.2174 23.6739Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 21.0652V24.9783C31 26.4131 26.5652 27.587 21.2174 27.587C15.8696 27.587 11.4348 26.4131 11.4348 24.9783V21.0652"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 24.9783V28.8913C31 30.3261 26.5652 31.5 21.2174 31.5C15.8696 31.5 11.4348 30.3261 11.4348 28.8913V24.9783"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5652 11.9348V15.8478C20.5652 17.2826 16.1304 18.4565 10.7826 18.4565C5.43478 18.4565 1 17.2826 1 15.8478V11.9348"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 15.8478V19.7609C1 21.1957 5.43478 22.3696 10.7826 22.3696H11.4348"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 19.7609V23.6739C1 25.1087 5.43478 26.2826 10.7826 26.2826H11.4348"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5652 15.8478V18.4565"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Money;
