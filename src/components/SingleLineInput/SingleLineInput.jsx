import styles from './SingleLineInput.module.css'

function SingleLineInput({ id, type, placeholder, value, onChangeFn }) {
    return (
        <input
            type={ type }
            id={ id } 
            name={ id }
            value={ value } 
            placeholder={ placeholder }
            className={ styles['input'] }
            onChange={(e) => onChangeFn(e)}
        />
    )
}

export default SingleLineInput
