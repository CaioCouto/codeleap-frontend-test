import { useState } from "react"

import styles from './LoginModal.module.css'
import Alert from "../Alert"
import Button from "../Button"
import SingleLineInput from "../SingleLineInput"
import { validateUsername } from "../../actions"

function LoginModal() {
    const [ username, setUsername ] = useState('')
    const [ alert, setAlert ] = useState({ show: false })

    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        const isValid = validateUsername(username)

        if (isValid) {
            location.reload()
            localStorage.setItem('user', username)
        }
        else {
            setAlert({
                show: true,
                variant: 'danger',
                message: "Username doesn't exist."
            })
        }
    }

    return (
        <div id="login" className={ styles["login"] }>
            <h3 className={ styles['login-title'] }>Welcome to CodeLeap network!</h3>

            {
                alert.show ?
                <Alert 
                    show={ alert.show }
                    variant={ alert.variant }
                    message={ alert.message }
                /> 
                : null
            }

            <form className={ styles['login-form'] } onSubmit={(e) => handleFormSubmit(e)}>
                <section className={ styles['login-form-section'] }>
                    <label htmlFor="usernameInput" className={ styles['login-form-label'] }>Please enter your username</label>
                    <SingleLineInput
                        type="text"
                        id="usernameInput"
                        value={ username }
                        placeholder="John Doe"
                        onChangeFn={(e) => handleUsernameChange(e)}
                    />
                </section>

                <Button
                    label="ENTER"
                    type="submit"
                    className="login"
                    disabled={ !username.length }
                />
            </form>

        </div>
    )
}

export default LoginModal
