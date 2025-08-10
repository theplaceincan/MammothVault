import { getSingleProduct, getVariantCost } from "@/app/services/getSingleProduct";
import styles from "./Handle.module.css";
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
  const variantId = product.variants.edges[0]?.node?.id as string;

  type UnitCost = { amount: string; currencyCode: string } | null;
  const unitCost: UnitCost = variantId ? await getVariantCost(variantId) : null;
  const costText = unitCost
    ? `$${Number(unitCost.amount).toFixed(2)} ${unitCost.currencyCode}`
    : '—';
  
  const firstImage = product.images.edges[0]?.node;

  console.log(product)

  return (
    <>
      <Navbar />
      <div className={styles["page"]}>
        <div className={styles["container"]}>
          <div className={styles["product-container"]}>
            <div className={styles["image-container"]}>
              <div className={styles["image-box"]}>
                <Image src={firstImage?.url ?? "/logos/standard.jpg"} alt={firstImage?.altText || product.title} fill sizes="(max-width:768px) 60vw, 260px" priority/>
              </div>
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["product-details"]}>
                <p className={styles["title"]}>{product.title}</p>
                <p className={styles["price"]}>{costText}</p>
                <input type="number" className={styles["quantity-input"]} defaultValue={1} min={1} />
              </div>
              <div className={styles["btn-container"]}>
                <button className={styles["btn-cart"]}>Add to Cart</button>
                <button className={styles["btn-buy"]}>Buy Now</button>
              </div>
            </div>
          </div>
          <div className={styles["description-container"]}>
            <p className={styles["description"]}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, atque! Quos, labore? Perspiciatis expedita commodi quibusdam quam ratione possimus illo voluptatibus ducimus nemo! Tenetur magni maiores aperiam ducimus, sequi aspernatur.</p>
          </div>
        </div>
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