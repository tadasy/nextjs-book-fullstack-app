import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json();

    try {
        await connectDB();
        const user = await UserModel.findOne({ email: reqBody.email });
        if (user) {
            if (user.password === reqBody.password) {
                const secretKey = new TextEncoder().encode("next-market-app-book");
                const payload = {
                    email: user.email,
                };
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime("1d")
                    .sign(secretKey);
                console.log(token);
                return NextResponse.json({ message: "ログイン成功", token: token });
            } else {
                return NextResponse.json({ message: "ログイン失敗:パスワードが間違っています" });
            }
        } else {
            return NextResponse.json({ message: "ログイン失敗" });
        }
    } catch (error) {
        return NextResponse.json({ message: "ログイン失敗" });
    }
}