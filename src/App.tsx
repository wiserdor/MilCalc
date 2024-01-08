import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import ReactGA from 'react-ga4'
import './App.css'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import Results from './components/Results/Results'

function initReactGA() {
  ReactGA.initialize('G-ZE1RDY2L6L')
  ReactGA.event({
    category: 'User',
    action: 'User opened the app',
  })
}

function App() {
  initReactGA()

  return (
    <div className="container">
      <Header />
      <Form />
      <Results />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
