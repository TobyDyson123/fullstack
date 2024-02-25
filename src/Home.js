import Navbar from './navbar';
import Hero from './hero';
import Mission from './mission';
import Info from './info';

function Home() {
  return (
    <div className="Home">
        <Navbar />
        <Hero />
        <Mission />
        <Info />
    </div>
  );
}

export default Home;