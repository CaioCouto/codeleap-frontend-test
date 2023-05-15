import './App.css'
import { Provider } from 'react-redux'

import { Home } from './pages'
import { store } from './redux'
import { DeletePostModal, Header, UpdatePostModal } from './components'


function App() {
	return (
		<>
			<Header/>
			<Provider store={ store }>				
				<Home/>
			</Provider>
		</>
	)
}

export default App
