import {Outlet, useNavigation} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './styles/_main.scss';

const App = () => {
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';

    return (
        <>
            <Header/>
            {isLoading ? <div>Loading...</div> : <Outlet/>}
            <Footer/>
        </>
    );
}

export default App;