import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { motion } from "framer-motion";
import { CSSProperties, useRef } from "react";

type ResultsBarResult = {
  label: string;
  description?: string;
  value: number;
  datePaid?: Date;
  color: CSSProperties["backgroundColor"];
};

export interface ResultsBarProps {
  segments: ResultsBarResult[];
}

const Tooltip = (props: {
  text: string;
  value: number;
  color: CSSProperties["backgroundColor"];
}) => {
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: true,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    placement: "top",
  });
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([role]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} />
      <FloatingPortal>
        <div
          className={`border-[rgba(204, 204, 204, 0.5)] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] max-w-60 rounded-lg border border-solid bg-white px-4 py-2 text-sm font-normal text-dark-gray`}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <FloatingArrow ref={arrowRef} context={context} fill="white" />
          <div className="flex flex-col text-center">
            <div className="text-xs font-bold" style={{ color: props.color }}>
              ₪
              {props.value.toLocaleString("he-IL", {
                maximumFractionDigits: 0,
              })}{" "}
            </div>
            <div className="text-color-[#6f6f6f] text-xs font-normal">
              {props.text}
            </div>
          </div>
        </div>
      </FloatingPortal>
    </>
  );
};

const ResultsBar = (props: ResultsBarProps) => {
  const { segments } = props;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className="relative w-full">
      <div className={`flex h-12 overflow-hidden rounded-2xl`}>
        {segments.map((segment, index) => (
          <motion.div
            layout
            key={index}
            className="box-border flex items-center justify-center"
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: segment.color,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Tooltip
              value={segment.value}
              text={segment.label}
              color={segment.color}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex p-2">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="box-border flex items-center justify-center"
            style={{
              width: `${(segment.value / total) * 100}%`,
              textAlign: `${index % 2 === 0 ? "start" : "end"}`,
              color: segment.color,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {((segment.value / total) * 100).toLocaleString("he-IL", {
              maximumFractionDigits: 0,
            })}
            %
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {" "}
        {[...segments].reverse().map((segment, index) => (
          <div key={index} className="flex flex-row gap-2">
            <div
              className="h-3 w-3 rounded-[2.52px]"
              style={{
                backgroundColor: segment.color,
              }}
            />
            <div className="text-xs text-[#6f6f6f]">
              <span className="font-bold">{segment.label}</span>:{" "}
              <span className="font-normal">{segment.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsBar;
