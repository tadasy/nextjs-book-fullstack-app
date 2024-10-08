import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request, context) {
    const token = await request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ message: "トークンがありません" }, { status: 401 });
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ message: "トークンが正しくないので、ログインしてください" }, { status: 401 });
    }
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path",
        "/api/item/delete/:path",
    ],
}