import styles from './Header.module.css'
import { deleteUser, readUser } from "../../actions"
import { IoLogOutSharp } from 'react-icons/io5';

function Header() {
	const user = readUser()

    function handleLogOut() {
        deleteUser()
        location.reload()
    }

    if (!user) return null;

    return (
        <header id="header" className={ styles['header'] }>
            <p className={ styles['header-brand'] }>CodeLeap Network</p>
            <IoLogOutSharp size={ 24 } className={ styles['header-icon'] } onClick={() => handleLogOut()} />
        </header>
    )
}

export default Header
