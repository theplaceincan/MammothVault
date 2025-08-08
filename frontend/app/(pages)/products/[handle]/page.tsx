import { getSingleProduct } from "@/app/services/getSingleProduct";
import Image from "next/image";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = params;
  const productData = await getSingleProduct(handle);

  if (!productData?.data?.product) {
    return <div>Product not found.</div>;
  }

  const product = productData.data.product;
  const firstImage = product.images.edges[0]?.node;

  return (
    <>
      <Navbar />
      <div>
        
      </div>
      <Footer />
    </>
  );
}



// <h1>{product.title}</h1>
//         {firstImage && (
//           <Image
//             priority
//             src={firstImage.url}
//             alt={firstImage.altText || product.title}
//             width={500}
//             height={500}
//           />
//         )}
//         <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />