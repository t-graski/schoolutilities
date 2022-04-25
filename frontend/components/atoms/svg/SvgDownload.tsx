import * as React from "react"

const SvgDownload = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M24 22.5a1.5 1.5 0 0 1-1.5 1.5h-21a1.5 1.5 0 0 1 0-3h21a1.5 1.5 0 0 1 1.5 1.5Zm-13.06-4.752a1.495 1.495 0 0 0 2.121 0l5.314-5.314a1.5 1.5 0 1 0-2.121-2.122L13.5 13.066V1.5a1.5 1.5 0 0 0-3 0v11.566l-2.754-2.754a1.5 1.5 0 0 0-2.121 2.122l5.314 5.314Z"
        fill="#A2A8C3"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgDownload
