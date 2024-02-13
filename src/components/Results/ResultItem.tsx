import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "react";

export interface NonApprovedItemProps {
  name: string;
  totalCompensation: number;
  totalCompensationStr?: string;
  description?: string;
  nonDirectMoney?: boolean;
  isMoney?: boolean;
  dateOfPayment?: Date;
  link?: { text: string; url: string };
  idfLink?: string;
}

const Tooltip = (props: {
  text: string;
  link?: NonApprovedItemProps["link"];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });
  const hover = useHover(context, {
    move: true,
    handleClose: safePolygon({
      requireIntent: false,
    }),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <img
        src="/svg/circle-exclamation.svg"
        alt="exclamation"
        ref={refs.setReference}
        {...getReferenceProps()}
      />
      <FloatingPortal>
        {isOpen && (
          <>
            <div
              className={`shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] border-[rgba(204, 204, 204, 0.5)] max-w-60 rounded-lg border border-solid bg-white px-4 py-2 text-sm font-normal text-dark-gray`}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div>{props.text}</div>
              {props.link && (
                <div className="mt-2">
                  <a
                    href={props.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.link.text}
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </FloatingPortal>
    </>
  );
};

const ResultItem = (props: NonApprovedItemProps) => {
  const {
    name,
    totalCompensation,
    totalCompensationStr,
    description,
    nonDirectMoney = false,
    isMoney = true,
    link,
    idfLink,
  } = props;
  return (
    <div
      className={`flex flex-col items-center justify-between rounded-lg border-[1.5px] border-dashed border-[#ccc] bg-ocean px-2 py-4 text-center text-sm font-normal`}
    >
      <div className={`flex flex-col items-center justify-start gap-[2px]`}>
        {isMoney && (
          <div className="text-blue">
            {totalCompensationStr
              ? totalCompensationStr
              : `${
                  nonDirectMoney ? "בשווי" : ""
                } ₪${totalCompensation.toLocaleString("he-IL")}`}
          </div>
        )}
        <div>{name}</div>
      </div>
      <a href={idfLink} target="_blank" rel="noopener noreferrer">
        <img src="/svg/arrow-left.svg" />
      </a>
      {description && (
        <div className="relative top-1 max-h-0">
          <Tooltip text={description} link={link} />
        </div>
      )}
    </div>
  );
};

export default ResultItem;
