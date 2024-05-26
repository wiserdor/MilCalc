import { chooseRandom } from "@/components/common/helpers";
import { StateCreator } from "zustand";
import { GlobalStore } from "./types";

export const createGlobalStore: StateCreator<
  GlobalStore,
  [],
  [],
  GlobalStore
> = () => ({
  adSelected: chooseRandom([
    // "riseup",
    "familybiz"
  ])
});
