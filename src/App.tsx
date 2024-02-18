import { Toaster } from "@/shadcn/ui/toaster";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import "./App.css";
import AdsSection from "./components/AdsSection/AdsSection";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import CalculatorForm from "./components/Form/CalculatorForm";
import Header from "./components/Header/Header";
import Independent from "./components/Independent/Independent";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import Results from "./components/Results/Results";

ReactGA.initialize("G-ZE1RDY2L6L");

const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-gJs2ne46YvtUmVO",
  enableDevMode: true,
  subscribeToChanges: true,
  trackingCallback: (experiment, result) => {
    ReactGA.event({
      category: "GrowthBook",
      action: "Viewed Experiment",
      label: experiment.key + " - " + result.key
    });
    console.log("GrowthBook", experiment.key, result.key);
  }
});

const generateUserId = () => {
  return Math.random().toString(36).substring(7);
};

function App() {
  useEffect(() => {
    const userId =
      document.cookie
        .match(/_ga=(.+?);/)?.[1]
        ?.split(".")
        ?.slice(-2)
        ?.join(".") ?? generateUserId();

    growthbook.loadFeatures();
    growthbook.setAttributes({
      id: userId
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <div className="flex w-full  items-center justify-center">
        <div className="overflow-hidden bg-white pt-16 md:max-w-96 md:shadow-lg">
          <div className="px-4">
            <Header />
            <CalculatorForm />
            <Results />
            <AdsSection />
            <Independent />
          </div>
          <FAQ />
          <div className="px-4">
            <NewsFeed />
          </div>
          <Footer />
        </div>
      </div>
      <Toaster />
    </GrowthBookProvider>
  );
}

export default App;
