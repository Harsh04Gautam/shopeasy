import {
  footerCss as css,
  footerGoogle,
  footerTwitter,
  footerInstagram,
  footerLinkedin,
} from "./index";

const Footer = () => {
  return (
    <div className={css["container"]}>
      <div className={css["admin-info"]}>
        <h3>Harsh Gautam</h3>
        <div>
          <img src={footerGoogle} alt="google icon" />
          <img src={footerInstagram} alt="instagram icon" />
          <img src={footerLinkedin} alt="linkedin icon" />
          <img src={footerTwitter} alt="twitter icon" />
        </div>
      </div>
      <div className={css["copyright"]}>
        <h3>@copyright</h3>
        <p>
          Built by Harsh Gautam. You are allowed to use this webpage for both
          personal use and commercial use. A credit to original author Harsh
          Gautam is always appreciated.
        </p>
      </div>
    </div>
  );
};

export default Footer;
