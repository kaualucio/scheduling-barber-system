export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/dashboard/**", "/login/dashboard" ]
}