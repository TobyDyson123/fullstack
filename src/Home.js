import Navbar from './navbar';
import Hero from './hero';
import Mission from './mission';

function Home() {
  return (
    <div className="Home">
        <Navbar />
        <Hero />
        <Mission />
    </div>
  );
}

export default Home;