import './App.css'
import Footer from './components/Footer/Footer'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import Results from './components/Results/Results'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

function App() {
  return (
    <div className="container">
      <Header />
      <Form />
      <Results />
      <Footer />
    </div>
  )
}

export default App
