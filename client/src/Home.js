import Navbar from './navbar';
import Hero from './hero';
import Mission from './mission';
import Info from './info';
import Final from './final';
import Footer from './footer';

function Home() {
  return (
    <div className="Home">
        <Navbar />
        <Hero />
        <Mission />
        <Info />
        <Final />
        <Footer />
    </div>
  );
}

export default Home;