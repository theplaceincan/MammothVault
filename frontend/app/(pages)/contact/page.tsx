'use client';
import Footer from "@/app/components/Footer"
import Navbar from "@/app/components/Navbar"

import styles from "./Contact.module.css"
// className={styles["container"]}
export default function About() {
  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["title-section"]}>
          <p className={styles["page-title"]}>Contact</p>
        </div>
        <div className={styles["form-container"]}>
          <div className={styles["form-wrapper"]}>
            <label className={styles["label"]}>Full name</label>
            <input className={styles["input"]}></input>
            <label className={styles["label"]}>Email</label>
            <input className={styles["input"]}></input>
            <label className={styles["label"]}>Phone number</label>
            <input className={styles["input"]}></input>
            <label className={styles["label"]}>Message</label>
            <textarea className={styles["input"]}></textarea>
            <div className={styles["btn-container"]}>
              <button className={styles["btn"]}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}