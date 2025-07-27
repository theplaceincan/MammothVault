import styles from "./Hero.module.css"
// className={styles.}

export default function Hero() {
  return (
    <div className={styles["hero-section"]}>
      <div className={styles["image-strip"]}>
      {[1, 6, 4, 2, 3, 5, 1, 6, 4, 2, 3, 5].map((i, idx) => (
        <div key={idx} className={styles["image-wrapper"]}>
          <div className={`${styles["image-inner"]}`}>
            <img src={`/hero-imgs/${i}.JPEG`} alt="" />
          </div>
        </div>
      ))}
    </div>
      <div className={styles["hero-text-container"]}>
        <p className={styles["hero-subtext"]}>Welcome to the</p>
        <p className={styles["hero-text"]}>MAMMOTH VAULT</p>
        <p className={styles["hero-subtext"]}>Las Vegas Gun Parts Store</p>
      </div>
    </div>
  )
}