import clsx from "clsx";
import { motion } from "framer-motion";
import { Ref, forwardRef } from "react";
export interface ToggleProps {
  active: boolean;
  onChange: (e: any) => void;
  label: string;
  name: string;
}

const Toggle = forwardRef((props: ToggleProps, ref: Ref<any>) => {
  const { active, onChange, label } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <div
        onClick={() => onChange(!active)}
        className={clsx(
          "w-max cursor-pointer rounded-[33px] border-[1.5px] border-solid px-[10px] py-[4px]",
          active ? "text-[#0066FF]" : "text-[#6F6F6F]",
          active ? "bg-[#F2F6FD]" : "bg-white",
          active ? "border-[#0066FF]" : "border-[#6F6F6F]",
        )}
        ref={ref}
      >
        {label}
      </div>
    </motion.div>
  );
});

export default Toggle;
