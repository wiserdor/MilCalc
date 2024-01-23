import ReactGA from 'react-ga4'
import './App.css'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import CalculatorForm from './components/Form/CalculatorForm'
import Header from './components/Header/Header'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Results from './components/Results/Results'
import RiseupBanner from './components/RiseupBanner/RiseupBanner'
import Independent from './components/Independent/Independent'

ReactGA.initialize('G-ZE1RDY2L6L')

function App() {
  return (
    <div className="container">
      <Header />
      <CalculatorForm />
      <Results />
      <RiseupBanner />
      <Independent />
      <FAQ />
      <NewsFeed />
      <Footer />
    </div>
  )
}

export default App
