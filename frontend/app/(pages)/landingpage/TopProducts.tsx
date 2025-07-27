import styles from "./TopProducts.module.css"
import Link from "next/link"
import Image from "next/image"

export default function TopProducts() {
  return (
    <div className={styles["container"]}>
      <Link href={"/"} className={styles["product-card"]}>
        <div className={styles["img-cover"]}>
          <Image className={styles["bottom-left-cut"]} width={200} height={10} src="/vault.png" alt='1'></Image>
        </div>
        <div className={styles["text-cover"]}>
          <p className={styles["card-title"]}>THE VAULT</p>
        </div>
      </Link>
      <div className="desktop-spacer"></div>
      <Link href={"/"} className={styles["product-card"]}>
        <div className={styles["img-cover"]}>
          <Image className={styles["bottom-left-cut"]} width={200} height={10} src="/vault.png" alt='1'></Image>
        </div>
        <div className={styles["text-cover"]}>
          <p className={styles["card-title"]}>THE DROP</p>
        </div>
      </Link>
    </div>
  )
}