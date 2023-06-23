import React from "react";
import { client } from "@/lib/sanityClient";
import Image from "next/image";

interface Iproduct {
  title: string;
  description: string;
  image: string[];
}

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    title,
    description
  }`);
  return res;
};

const Home = async () => {
  const data: Iproduct[] = await getProductData();
  console.log(data);
  return (
    <div>
      <div>
        {data.map((items) => (
          <>
            <h1>{items.title}</h1>
            {/* {items.image.map((img) => (
              <Image src={img} alt="img" />
            ))} */}
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
