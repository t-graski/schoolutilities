import * as React from "react"

const SvgHamburger = (props) => (
  <svg
    viewBox={`0 0 44 38`}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={44} height={6} rx={3} fill="currentColor" />
    <rect y={16} width={44} height={6} rx={3} fill="currentColor" />
    <rect y={32} width={44} height={6} rx={3} fill="currentColor" />
  </svg>
)

export default SvgHamburger
