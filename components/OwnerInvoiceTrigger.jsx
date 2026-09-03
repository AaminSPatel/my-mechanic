"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerInvoiceTrigger() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef(null);

  const handleTap = () => {
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        if (timerRef.current) clearTimeout(timerRef.current);
        router.push("/invoice");
        return 0;
      }
      return next;
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 1500);
  };

  return (
    <div
      onClick={handleTap}
      role="button"
      tabIndex={-1}
      aria-hidden="true"
      title=""
      className="fixed bottom-0 right-0 w-16 h-16 z-50 select-none opacity-0 cursor-default pointer-events-auto"
      style={{ touchAction: "manipulation" }}
    />
  );
}

