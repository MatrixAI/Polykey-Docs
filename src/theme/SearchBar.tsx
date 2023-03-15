import React from "react";
import styles from "./SearchBar.module.css";

type Props = {};

export default function FooterLayout(props: Props): JSX.Element {
  return (
    <form
      id="email-form"
      name="email-form"
      className={styles.form}
      data-name="Email Form"
      action="//matrix.us9.list-manage.com/subscribe/post?u=c95e0a682d8937f12732b48d4&amp;amp;id=863aebab0f"
      method="post"
      aria-label="Email Form"
    >
      <input
        type="email"
        className={styles.email}
        maxLength={256}
        name="EMAIL"
        data-name="EMAIL"
        placeholder="Your Email"
        id="mce-EMAIL"
        required={true}
      />
      <input type="submit" className={styles.button} value="Get Started" />
    </form>
  );
}
