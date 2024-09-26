"use client";

import useAuth from "../../../utils/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(() => {
    const getSingleItem = async (id) => {
      try {
        const response = await fetch(`/api/item/readsingle/${id}`, { cache: "no-store" });
        const jsonData = await response.json();
        setTitle(jsonData.singleItem.title);
        setPrice(jsonData.singleItem.price);
        setImage(jsonData.singleItem.image);
        setDescription(jsonData.singleItem.description);
        setEmail(jsonData.singleItem.email);
      } catch (error) {
        alert("アイテム取得失敗");
        console.error(error);
      }
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/item/update/${context.params.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          price,
          image,
          description,
          email: loginUserEmail,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("アイテム編集失敗");
      console.error(error);
    }
  };

  console.log(loginUserEmail, email);
  if (loginUserEmail && loginUserEmail === email) {
    return (
      <div>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required />
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" placeholder="価格" required />
          <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
}

export default UpdateItem;