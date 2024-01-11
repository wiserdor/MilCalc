import './App.css'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Results from './components/Results/Results'
import RiseupBanner from './components/RiseupBanner/RiseupBanner'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-ZE1RDY2L6L')

function App() {
  return (
    <div className="container">
      <Header />
      <Form />
      <Results />
      <RiseupBanner />
      <FAQ />
      <NewsFeed />
      <Footer />
    </div>
  )
}

export default App
