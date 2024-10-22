import { NextResponse } from "next/server";

export async function middleware(req) {
  // Access token from headers or cookies
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const response = await fetch(
      "https://salarmhmdn.ir/coffe/verifyToken",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/pages/products/:path*", "/pages/cart"],
};
