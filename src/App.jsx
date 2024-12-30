import './App.css';

import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/Footer';

import HomePage from './features/allProducts/HomePage';



function App() {

  return (
    <>
      <Header />
      
      <HomePage />

      <Footer />
    </>
  )
}

export default App;
