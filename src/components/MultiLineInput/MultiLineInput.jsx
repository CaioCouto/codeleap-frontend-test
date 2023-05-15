import styles from './MultiLineInput.module.css'

function MultiLineInput({ id, placeholder, value, onChangeFn }) {
    return (
        <textarea
            id={ id }
            name={ id }
            placeholder={ placeholder }
            value={ value }
            onChange={ (e) => onChangeFn(e) }
            cols="30"
            rows="10"
            className={ styles['textarea'] }
        ></textarea>
    )
}

export default MultiLineInput
