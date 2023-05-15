import { useState } from "react"
import { useDispatch } from "react-redux"

import styles from './PostForm.module.css'
import Button from "../Button"
import Loading from "../Loading"
import MultiLineInput from "../MultiLineInput"
import SingleLineInput from "../SingleLineInput"

import { modalActions } from "../../redux/"
import { createPost, readUser, updatePost } from "../../actions"

const user = readUser()

function CreateButtonSection({ createNewPostFn, disabled }) {
    return (
        <Button
            label="Create"
            type="button"
            onClickFn={ () => createNewPostFn() }
            className="submit"
            disabled={ disabled }   
        />
    )
}

function EditButtonSection({ updatePostFn, disabled }) {
    const dispatch = useDispatch()

    return (
        <>
            <Button
                label="Cancel"
                type="button"
                onClickFn={ () => dispatch(modalActions.close()) }
                className="cancel"
            />

            <Button
                label="Save"
                type="button"
                onClickFn={ () => updatePostFn()}
                className={ disabled ? "" : "save" }
                disabled={ disabled }
            />
        </>
    )
}

export default function PostForm({ setAlert, update, id=null, updatePostList }) {
    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(false)
    const [ postTitle, setPostTitle ] = useState('')
    const [ postContent, setPostContent ] = useState('')

    const handlePostTitleChange = (e) => setPostTitle(e.target.value)
    const handlePostContentChange = (e) => setPostContent(e.target.value)

    async function createNewPost() {
        let variant = '', message = ''
        setLoading(true)

        try {
            await createPost(user, postTitle, postContent)
            setPostTitle('')
            setPostContent('')
            updatePostList('success', 'Post has been created successfuly.')
        } catch (error) {
            variant = 'danger',
            message = 'An error had ocurred.'
            console.log(error.response)
            setAlert({
                show: true,
                variant: variant,
                message: message
            })
            setTimeout(() => {
                setAlert({ show: false})
            }, 2000);
        } finally {
            setLoading(false)
        }
    }
    
    async function updateOnePost() {
        let variant = '', message = ''
        setLoading(true)
        
        try {
            await updatePost(id, postTitle, postContent)
            updatePostList('success', 'Post has been updated successfuly.')
            dispatch(modalActions.close())
        } catch (error) {
            console.log(error)
            variant = 'danger',
            message = 'An error had ocurred.'
            setAlert({
                show: true,
                variant: variant,
                message: message
            })
            setTimeout(() => {
                setAlert({ show: false })
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={ styles['form'] }>
            <section className={ styles['form-section'] }>
                <label htmlFor="titleInput">Title</label>
                <SingleLineInput
                    type="text"
                    id="titleInput"
                    value={ postTitle }
                    placeholder="Hello, world!"
                    onChangeFn={(e) => handlePostTitleChange(e)}
                />
            </section>

            <section className={ styles['form-section'] }>
                <label htmlFor="contentInput">Content</label>
                <MultiLineInput
                    id="contentInput"
                    value={ postContent }
                    placeholder="Content here."
                    onChangeFn={(e) => handlePostContentChange(e)}
                />
            </section>

            <section className={ styles['form-section-buttons'] }>
            {
                loading ?
                <Loading show={ loading }/>
                : !update ?
                <CreateButtonSection
                    createNewPostFn={ createNewPost }
                    disabled={ !postTitle.length || !postContent.length }
                /> :
                <EditButtonSection 
                    updatePostFn={ updateOnePost }
                    disabled={ !postTitle.length || !postContent.length }
                />

            }
            </section>            
        </form>
    )
}
