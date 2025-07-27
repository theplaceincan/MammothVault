import "../css/Footer.css"

export default function Footer() {
  return (
    <>
    <div className="footer-container">
      <div className="infos">
        <div className="info-container">
          <p className="info-title">NAVIGATE</p>
          <div className="info-section">
            <a className="footer-text-btn">Contact Us</a>
            <a className="footer-text-btn">Shop</a>
          </div>
        </div>
        <div className="info-container">
          <p className="info-title">COLLECTIONS</p>
          <div className="info-section">
            <a className="footer-text-btn">The Vault</a>
            <a className="footer-text-btn">The Drop</a>
          </div>
        </div>
        <div className="info-container">
          <p className="info-title">ABOUT</p>
          <div className="info-section">
            <p className="info-text">Mammoth Vault is your tactical source for great gun parts — built tough, built to last, back from extinction.</p>
          </div>
        </div>
        <div className="info-container">
          <p className="info-title">INFO</p>
          <div className="info-section">
            <p className="info-text">702-999-9999</p>
            <p className="info-text">9999 St Joe Street, Las Vegas, NV, 89101</p>
          </div>
        </div>
      </div>
      <div className="footer-boring-cover">
        <a className="footer-text-btn">Privacy Policy</a>
        <p className="p-3"></p>
        <a className="footer-text-btn">Terms and Conditions</a>
      </div>
    </div>
    </>
  )
}