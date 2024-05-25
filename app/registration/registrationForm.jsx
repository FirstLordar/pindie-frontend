import Styles from '@/app/registration/registrationForm.module.css'
import { useState } from 'react';
import { endpoints } from '../api/config';
import { registration } from '../api/api-utils';

export const RegForm = () => {

  const [regData, setRegData] = useState({ identifier: "", email: "", password: "" });
  const handleInput = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    console.log(regData)
    }; 

    const handleSubmit = async (e) => {
      e.preventDefault();
      const userData = await registration(endpoints.auth, regData);
      if (isResponseOk(userData)) {
        authContext.login({...userData, id: userData._id}, userData.jwt);
                setMessage({ status: "success", text: "Вы авторизовались!" });
      } else {
        setMessage({ status: "error", text: "Неверные почта или пароль" });
      }
      
    }; 
    return (
      <main className="main-inner">
        <form onSubmit={handleSubmit} className={Styles['form']}>
        <h1 className={Styles['form__title']}>Регистарция</h1>
        <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Login</span>
            <input className={Styles['form__field-input']} onInput={handleInput} type="text" 
            name="email" placeholder="Введите Логин"/>
          </label>
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Email</span>
            <input className={Styles['form__field-input']} onInput={handleInput} type="email" 
            name="email" placeholder="Введите почту"/>
          </label>
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Пароль</span>
            <input className={Styles['form__field-input']} onInput={handleInput} type="password" 
            name="password" id='passwordOne' placeholder='***********'/>
          </label>
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Пароль еще раз</span>
            <input className={Styles['form__field-input']} onInput={handleInput} type="password" 
            name="password" id='passwordTwo' placeholder='***********'/>
          </label>
        </div>
        
        
        <div className={Styles['form__actions']}>
          <button className={Styles['form__reset']} type="reset">Очистить</button>
          <button /*disabled={passwordOne.value === passwordTwo.value}*/ className={Styles['form__submit']} type="submit">Регистарция</button>
        </div>
      </form>
      </main>
    );
}