import ReactLoading from 'react-loading';

function Loading({ show }) {
    if (show) {
        return (
            <ReactLoading type={'spinningBubbles'} height={ "100%" } color={ "#7695EC" } />
        )
    }
}

export default Loading
