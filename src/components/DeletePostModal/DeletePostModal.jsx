import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from './DeletePostModal.module.css'
import Alert from "../Alert"
import Button from "../Button"
import { modalActions } from "../../redux"
import { deletePost } from "../../actions"
import Loading from "../Loading"


export default function DeletePostModal({ updatePostList }) {
    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(false)
    const { modal } = useSelector(state => state)
    const [ alert, setAlert ] = useState({ show: false })

    function handleEscapeKeyPress(e) {
        const escapeKeyCode = 27
        if (e.keyCode === escapeKeyCode) { return dispatch(modalActions.close()) }
    }
    
    async function deleteOnePost() {
        setLoading(true)
        try {
            await deletePost(modal.postId)
            updatePostList('success', 'Post has been deleted successfuly.')
            dispatch(modalActions.close())
        } catch(error) {
            console.log(error)
            setAlert({
                show: true,
                variant: 'danger',
                message: 'An error has occured.'
            })
        }
        finally {
            setLoading(false)
        }
    }

    if(modal.type !== 'delete') { return null }

    return (
        <div id="modal" className={ styles["modal"] } onKeyUp={(e) => handleEscapeKeyPress(e)} tabIndex="-1">
            <section id="modal-section" className={ styles["modal-section"] }>                
                <h3 className={ styles['modal-title'] }>Are you sure you want to delete this item?</h3>

                {
                    alert.show ?
                    <Alert 
                        show={ alert.show }
                        variant={ alert.variant }
                        message={ alert.message }
                    /> 
                    : null
                }

                <section className={` ${styles['modal-buttons']}`}>
                    {
                        loading ?
                        <Loading show={ loading }/> :
                        <>
                            <Button
                            label="Cancel"
                            type="button"
                            onClickFn={ () => dispatch(modalActions.close()) }
                            className="cancel"
                            />

                            <Button
                                label="Delete"
                                type="button"
                                onClickFn={ () => deleteOnePost()}
                                className="delete"
                            />
                        </>
                    }
                </section>
            </section>
        </div>
    )
}
