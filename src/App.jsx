import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import router-related components
import Footer from "./Footer";
import Home from "./Home"; // Import Home component
import MovieDetail from "./MovieDetail"; // Import the MovieDetail component

function App() {
  
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie Detail Route */}
        </Routes>

        <Footer />
    </Router>
  );
}

export default App;
