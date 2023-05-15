import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from './UpdatePostModal.module.css'
import Alert from "../Alert"
import PostForm from "../PostForm"
import { modalActions } from "../../redux"

function UpdatePostModal({ updatePostList }) {
    const dispatch = useDispatch()
    const { modal } = useSelector(state => state)
    const [ alert, setAlert ] = useState({ show: false })

    function handleEscapeKeyPress(e) {
        const escapeKeyCode = 27
        if (e.keyCode === escapeKeyCode) { return dispatch(modalActions.close()) }
    }

    if(modal.type !== 'edit') { return null }

    return (
        <div id="modal" className={ styles["modal"] } onKeyUp={(e) => handleEscapeKeyPress(e)} tabIndex="-1">
            <section id="modal-section" className={ styles["modal-section"] }>                
                <h3 className={ styles['modal-title'] }>Edit item</h3>

                {
                    alert.show ?
                    <Alert 
                        show={ alert.show }
                        variant={ alert.variant }
                        message={ alert.message }
                    /> 
                    : null
                }

                <PostForm 
                    update={ true }
                    setAlert={ setAlert }
                    id = { modal.postId }
                    updatePostList={ updatePostList }
                />
            </section>
        </div>
    )
}

export default UpdatePostModal
