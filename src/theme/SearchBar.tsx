import React from "react";
import styles from "./SearchBar.module.css";

type Props = {};

export default function FooterLayout(_props: Props): JSX.Element {
  return (
    <form
      id="email-form"
      name="email-form"
      className={styles.form}
      data-name="Email Form"
      action="//forms.hubspot.com/uploads/form/v2/23899433/e98d21e5-de4a-47b6-990e-83818c19ce66"
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
