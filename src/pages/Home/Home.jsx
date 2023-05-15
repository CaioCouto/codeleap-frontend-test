import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './Home.module.css'
import { modalActions } from '../../redux'
import { calculateTimeFromNow } from '../../utils'
import { getPosts, readUser } from '../../actions'
import { Alert, DeletePostModal, Loading, LoginModal, PostForm, UpdatePostModal } from '../../components'
import { IoCreateOutline, IoTrashBinSharp } from 'react-icons/io5'


const user = readUser()

function PostSection({ posts }) {
    const dispatch = useDispatch()
    const openModal = (id, type) => { dispatch(modalActions.open(id, type)) }

    function formatPostTimeSpan(datetime) {
        let [ diff, timeUnit ] = calculateTimeFromNow(new Date(datetime))
        if(diff <= 0) { return `A few seconds ago.` }
        timeUnit += diff > 1 ? 's' : ''
        return `${diff} ${timeUnit} ago`
    }   

    if(!posts.length) {
        return (
            <section className={`${styles["main-section"]} ${styles["main-section-posts"]}`}>
                <div className={ styles["main-section-postHeader"] }>
                    <h2 className={ styles["main-section-postHeader-title"] }>Oh, no!</h2>
                </div>

                <div className={ styles["main-section-postBody"] }>
                    <p>No posts could be found!{''}</p>
                    <p>Yours could be the first! What do you think? :)</p>
                </div>
            </section>
        )
    }

    return (
        <>
        {
            posts.map(post => (
                <section key={ post.id } className={`${styles["main-section"]} ${styles["main-section-posts"]}`} onScroll={() => console.log('first')}>
                    <div className={ styles["main-section-postHeader"] }>
                        <h2 className={ styles["main-section-postHeader-title"] }>{ post.title }</h2>
                        {
                            user !== post.username ?
                            null:
                            <div className={ styles["main-section-postHeaderIcons"] }>
                                <IoTrashBinSharp onClick={ () => openModal(post.id, 'delete') }/>
                                <IoCreateOutline onClick={ () => openModal(post.id, 'edit') }/>
                            </div>
                        }
                    </div>

                    <div className={ styles["main-section-postBody"] }>
                        <div className={ styles["main-section-postInformation"] }>
                            <p className={ styles["main-section-postInformation-user"] }>@{ post.username }</p>
                            <p className={ styles["main-section-postInformation-time"] }>{ formatPostTimeSpan(post.created_datetime) }</p>
                        </div>

                        <p className={ styles["main-section-postContent"] }>{ post.content }</p>
                    </div>
                </section>
            ))
        }
        </>
    )
}

export default function Home() {
    const [ posts, setPosts ] = useState([])
    const [ alert, setAlert ] = useState({ show: false })
    const [ hasMorePosts, setHasMorePosts ] = useState('')

    async function getAllPosts() {
        try {
            const tmpPosts = await getPosts(hasMorePosts)
            const tmpNextLink = tmpPosts.next.split('/').slice(-1)
            setPosts(previous => [...previous, ...tmpPosts.results])
            setHasMorePosts(tmpNextLink)
        } catch (error) {
            console.log(error)
            setPosts([])
            setAlert({
                show: true,
                variant: 'danger',
                message: 'An error had occured.'
            })
            setTimeout(() => { setAlert({ show: false }) }, 2000)
        }
    }

    function updatePosts(alertVariant, alertMsg) {
        setPosts([])
        setHasMorePosts('')
        setAlert({
            show: true,
            variant: alertVariant,
            message: alertMsg
        })
    }

    useEffect(() => {
        if (posts.length === 0) {
            getAllPosts()
        }
    }, [posts])

    if(!user) { return <main id="main" className={`${styles["main"]} ${styles["main-login"]}`}><LoginModal/></main> }

    return (
        <main id="main" className={ styles["main"] }>
            
            <UpdatePostModal updatePostList={ updatePosts }/>
            <DeletePostModal updatePostList={ updatePosts }/>

            <Alert
                show={alert.show}
                variant={ alert.variant }
                message={ alert.message }
            />

            <section className={ styles['main-section'] }>
                <h2 className={ styles['main-section-title'] }>What&apos;s on your mind?</h2>

                <PostForm setAlert={ setAlert } updatePostList={ updatePosts }/>
            </section>

            <InfiniteScroll
                dataLength={ posts.length }
                next={ getAllPosts }
                hasMore={ !!hasMorePosts }
                loader={ <h4>Loading...</h4> }
            >
                <PostSection posts={ posts }/>
            </InfiniteScroll>
        </main>
    )
}
