import React from "react";

export interface ListenTarget {
  key: string;
  process: () => void;
}

export function useIframe() {
  const [isIframe, setIsIframe] = React.useState(false);

  React.useEffect(() => {
    const isIframe = window.location !== window.parent.location;
    setIsIframe(isIframe);
  }, []);

  const subscribe = (key: string, cb: (value: string) => void) => {
    const impl = (e: any) => {
      if (!e.data || e.data.target !== "kagura") {
        return;
      }
      if (e.data.action === key) {
        cb(e.data.value);
        window.removeEventListener("message", impl);
      }
    };
    window.addEventListener("message", impl);
  };

  const post = (action: string, value: string) => {
    window.parent.postMessage({ target: "kagura", action, value }, "*");
  };

  return { isIframe, post, subscribe };
}
