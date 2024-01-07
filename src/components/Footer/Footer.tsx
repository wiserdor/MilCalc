import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="contact-us">
        <p>
          נשמח לשמוע מכם בכל נושא שקשור למחשבון זה. ניתן ליצור קשר במייל:
          <a href="mailto:yslook7@gmail.com">yslook7@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
