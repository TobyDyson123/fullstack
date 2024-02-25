import Navbar from './navbar';
import Hero from './hero';
import Mission from './mission';
import Info from './info';
import Final from './final';

function Home() {
  return (
    <div className="Home">
        <Navbar />
        <Hero />
        <Mission />
        <Info />
        <Final />
    </div>
  );
}

export default Home;