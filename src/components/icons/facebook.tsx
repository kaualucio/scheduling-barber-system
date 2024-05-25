import { ComponentProps } from "react"

function Facebook(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_30_8)">
        <path
          d="M100 50.306C100 22.52 77.612-.006 50-.006 22.375 0-.012 22.519-.012 50.313c0 25.106 18.287 45.918 42.187 49.693V64.85H29.488V50.313h12.7V39.218c0-12.607 7.468-19.569 18.887-19.569 5.475 0 11.194.981 11.194.981v12.375h-6.306c-6.207 0-8.144 3.882-8.144 7.863v9.437H71.68L69.47 64.844H57.813V100C81.713 96.225 100 75.412 100 50.306z"
        />
      </g>
      <defs>
        <clipPath id="clip0_30_8">
          <path fill="#fff" d="M0 0H100V100H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Facebook
