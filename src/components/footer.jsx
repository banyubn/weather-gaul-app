import { HeartIcon, CodeIcon } from "./icons"

// footer keren dengan nama developer
export default function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-content">
        <div className="footer-text">
          <span>Dibuat oleh</span>
          <div className="footer-heart">
            <HeartIcon />
          </div>
          <span className="footer-name">Banyu Bagastara Nugroho</span>
        </div>
        <div className="footer-text">
          <div className="footer-code">
            <CodeIcon />
          </div>
          <span>Weather Gaul App</span>
        </div>
      </div>
    </div>
  )
}
