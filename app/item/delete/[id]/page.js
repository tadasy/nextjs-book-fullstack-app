"use client";

import useAuth from "../../../utils/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeleteItem = (context) => {
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
      const response = await fetch(`/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email: loginUserEmail,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("アイテム削除失敗");
      console.error(error);
    }
  };

  if (loginUserEmail && email === loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image src={image} alt="item-image" width={750} height={500} priority />
          <h3>\{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
}

export default DeleteItem;