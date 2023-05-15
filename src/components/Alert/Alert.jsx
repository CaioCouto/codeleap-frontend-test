import styles from './Alert.module.css'
import { IoAlertSharp, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

function Alert({ show, variant='success', message='' }) {
    if (show) {
        const alerts = {
            'success': {
                icon: <IoCheckmarkSharp size={ 24 }/>,
                className: 'success'
            },
            'alert': {
                icon: <IoAlertSharp size={ 24 }/>,
                className: 'alert'
            },
            'danger': {
                icon: <IoCloseSharp size={ 24 }/>,
                className: 'danger'
            },
        }

        return (
            <div id="alert" className={`${styles['alert']} ${styles[`alert--${alerts[variant].className}`]}`}>
                { alerts[variant].icon }
                <p className={ styles['alert-message'] }>{message}</p>
            </div>
        )
    }
}

export default Alert
