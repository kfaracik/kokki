const K_RIGHT =
  "M285.27,68.21l-12.03-20.03c-.11-.16-.2-.29-.29-.42-.14-.2-.27-.39-.41-.57-3.68-4.98-8.4-10.15-15.59-10.88v-4.39c7.19-.73,11.91-5.91,15.59-10.89.14-.19.28-.39.42-.59.09-.13.17-.25.26-.37l12.05-20.07h26.32l-21.95,34.04.04.06-.05.06,21.95,34.05h-26.32Z";
const K_MID =
  "M222.54,68.21l-12.03-20.03c-.12-.16-.21-.3-.3-.43-.14-.21-.27-.39-.4-.57-3.68-4.98-8.4-10.15-15.59-10.89v-4.39c7.19-.73,11.91-5.91,15.59-10.89.14-.18.27-.37.4-.56.1-.14.19-.27.28-.4L222.54,0h26.32l-21.95,34.04.04.06-.05.06,21.95,34.05h-26.32Z";
const K_LEFT =
  "M57.65,68.21l-12.03-20.03c-.12-.17-.21-.3-.3-.43-.14-.2-.27-.38-.4-.56-3.68-4.98-8.4-10.15-15.59-10.89v-4.39c7.19-.73,11.91-5.91,15.59-10.89.14-.19.27-.38.41-.57.1-.15.19-.27.27-.38L57.65,0h26.32l-21.95,34.04.04.06-.05.06,21.95,34.05h-26.32Z";
const O_DISC =
  "M119.87,59.87c-12.21,0-22.14-9.93-22.14-22.14s9.93-22.14,22.14-22.14,22.15,9.93,22.15,22.14-9.94,22.14-22.15,22.14Z";

import { useId } from "react";

export default function Logo({
  burner = false,
  className,
}: {
  burner?: boolean;
  className?: string;
}) {
  const gradId = useId();
  return (
    <svg
      viewBox="0 0 352.38 68.21"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="330.28" width="22.1" height="68.21" />
      <path d={K_RIGHT} />
      <path d={K_MID} />
      <rect x="164.89" width="21.23" height="68.21" />
      <path d={K_LEFT} />
      <rect width="21.23" height="68.21" />
      {burner ? (
        <>
          <defs>
            <radialGradient id={gradId}>
              <stop offset="0%" stopColor="#f59a3c" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#e8622a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#e8622a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="o-group">
            <circle
              className="o-glow"
              cx="119.87"
              cy="37.73"
              r="62"
              fill={`url(#${gradId})`}
            />
            <circle className="ring r3" cx="119.87" cy="37.73" r="52" />
            <circle className="ring r2" cx="119.87" cy="37.73" r="41" />
            <circle className="ring r1" cx="119.87" cy="37.73" r="31" />
            <path className="logo-o" d={O_DISC} />
          </g>
        </>
      ) : (
        <path className="logo-o" d={O_DISC} />
      )}
    </svg>
  );
}
