import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ShadowContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [root, setRoot] = useState<null | ShadowRoot>(null);
  const [ref, setRef] = useState<null | HTMLDivElement>(null);

    useEffect(() => {
        if (ref && !root) {
            setRoot(ref.attachShadow({ mode: 'open' }));
        }
    }, [ref]);

    return <div className="shadow-container" ref={setRef}>{
        root && createPortal(children, root)
    }</div>;
}