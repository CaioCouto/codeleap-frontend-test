import styles from './Button.module.css'

function Button({ type, className, disabled, onClickFn=null, label }) {
    const setDisabledClass = () =>  disabled ? styles["genericButton--disabled"] : ''

    return (
        <button
            type={ type }
            className={ `${styles["genericButton"]} ${setDisabledClass()} ${styles[className]}` }
            disabled={ disabled }
            onClick={() => !!onClickFn ? onClickFn() : {}}
        >
            { label }
        </button>
    )
}

export default Button
