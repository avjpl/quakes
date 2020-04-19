import React, { useState } from 'react';

import styles from './LoginForm.css';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');

  const emailHandler = (evt) => {
    const value = evt.target.value;
    setEmail(value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    login({ variables: { email }});
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.form__content}>
        <label className={styles.form__label} htmlFor='email'>
          <input
            className={styles.form__input}
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={emailHandler}
          />
        </label>

        <button className={styles.form__button} type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
