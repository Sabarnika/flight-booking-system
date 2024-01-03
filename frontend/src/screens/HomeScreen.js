import HomeSearch from "../components/HomeSearch";
import HomeSlider from "../components/HomeSlider";
import Navbar from "../components/Navbar";

export default function HomeScreen() {
  return (
    <div>
      <Navbar />
      <HomeSlider />
      <HomeSearch />
    </div>
  );
}
