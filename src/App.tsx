import ReactGA from 'react-ga4'
import './App.css'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import CalculatorForm from './components/Form/CalculatorForm'
import Header from './components/Header/Header'
import Independent from './components/Independent/Independent'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Results from './components/Results/Results'
import RiseupBanner from './components/RiseupBanner/RiseupBanner'
import WeaccelerateAd from './components/WeaccelerateAd/WeaccelerateAd'

ReactGA.initialize('G-ZE1RDY2L6L')

function App() {
  return (
    <div className="w-full flex  justify-center items-center">
      <div className="md:max-w-96 md:shadow-lg bg-white pt-16 overflow-hidden">
        <div className="px-4">
          <Header />
          <CalculatorForm />
          <Results />
          <WeaccelerateAd />
          <RiseupBanner />
          <Independent />
        </div>
        <FAQ />
        <div className="px-4">
          <NewsFeed />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
