import { getSingleProduct, getVariantCost } from "@/app/services/getSingleProduct";
import styles from "./Handle.module.css";
import Image from "next/image";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductActions from "./ProductActions";

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
              </div>
              <div className={styles["btn-container"]}>
                {variantId && <ProductActions variantId={variantId}/>}
              </div>
            </div>
          </div>
          <div className={styles["description-container"]}>
            <div className={styles["description"]} dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? '' }}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}