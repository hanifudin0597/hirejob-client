import { NextResponse } from "next/server";

export default function middleware(req) {
    const { token } = req.cookies;
    const { pathname, origin } = req.nextUrl;
    // console.log()

    if (!token && pathname !== "/login" && pathname !== "/register") {
        return NextResponse.redirect(`${origin}/login`)
    }
}