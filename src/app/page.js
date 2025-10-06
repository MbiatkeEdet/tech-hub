import Footer from "./components/Footer"
import HeroMarquee from "./components/HeroMarquee";
import HeroSection from "./components/HeroSection";
import InnovativeSolutions from "./components/InnovativeSolutions";
import Navbar from "./components/Navbar";
import Services from "./components/Services";


export const metadata = {
  title: "Lemtech Hub Nigeria | Shaping The Future With Cutting-Edge IT Solutions",
  description: "IT service company  based in port harcourt, Nigeria",
};
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <InnovativeSolutions />
      <HeroMarquee />
      <Services />

      <Footer />
    </main>
  )
}
