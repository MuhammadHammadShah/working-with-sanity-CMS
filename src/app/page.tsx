import React from "react";
import { client } from "@/components/lib/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { Button } from "@/components/ui/button";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price,
      _id,
      title,
      image,
      category -> {
        name,
        _id
      }
  }`);
  return res;
};

interface Iproduct {
  title: string;
  _id: string;
  price: number;
  description: string;
  image: IImage;
  category: {
    name: string;
  };
}

const Home = async () => {
  const data: Iproduct[] = await getProductData();
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10">
        {data.map((items) => (
          <div>
            <Image
              className="max-h-[200px] object-cover object-top"
              width={200}
              height={200}
              src={urlForImage(items.image).url()}
              alt="product"
            />
            <h2>{items.title}</h2>
            <h3>{items.price}</h3>
            <Button>Add to Cart</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
