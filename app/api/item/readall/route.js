import connectDB from "../../../utils/database";
import { NextResponse } from "next/server";
import { ItemModel } from "../../../utils/schemaModels";

export async function GET(request) {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return NextResponse.json({ message: "アイテム取得成功（オール）", allItems: allItems });    
    } catch (error) {
        return NextResponse.json({ message: "アイテム取得失敗（オール）" });
    }
}

export const revalidate = 0;