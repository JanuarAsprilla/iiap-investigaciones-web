"use client";

import { useEffect } from "react";

/** Sets body[data-theme="light"] while the component is mounted.
 *  On unmount (navigation), removes the attribute so the dark home stays dark.
 */
export function useLightTheme() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "light");
    return () => {
      document.body.removeAttribute("data-theme");
    };
  }, []);
}
