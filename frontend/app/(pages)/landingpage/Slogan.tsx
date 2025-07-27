import styles from "./Slogan.module.css"

export default function Slogan() {
  return (
    <div className={styles["slogan-container"]}>
      <p className={styles["slogan-text"]}>BACK FROM EXTINCTION</p>
    </div>
  )
}