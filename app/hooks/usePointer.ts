"use client";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const QUERY = "(pointer: fine)";

const subscribe = (onStoreChange: () => void) => {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** The server has no pointer, so the first paint assumes there is none. */
const getServerSnapshot = () => false;

/**
 * True only on a device with a real pointer, and only when the visitor has not
 * asked for less motion. Every pointer-driven effect gates on this, so nothing
 * hover-shaped ever renders on a touch screen or fights a reduced-motion
 * setting.
 *
 * Read through useSyncExternalStore rather than an effect plus useState: a
 * media query is an external store, and subscribing to it this way avoids the
 * cascading render that setting state inside an effect causes.
 */
export const usePointerEffects = () => {
  const finePointer = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const reduceMotion = useReducedMotion();

  return finePointer && !reduceMotion;
};
