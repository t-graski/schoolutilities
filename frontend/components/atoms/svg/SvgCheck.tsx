import * as React from "react"

const SvgCheck = (props) => (
  <svg
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M29.121 9.517 13.295 25.87a2.935 2.935 0 0 1-4.246 0l-8.17-8.442a3.176 3.176 0 0 1 0-4.388 2.934 2.934 0 0 1 4.246 0l6.048 6.249 13.702-14.16a2.935 2.935 0 0 1 4.246 0 3.177 3.177 0 0 1 0 4.388Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h30v31H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgCheck
