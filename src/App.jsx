import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Footer from "./Footer";
import Home from "./Home"; 
import MovieDetail from "./MovieDetail"; 

function App() {
  
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> 
        </Routes>

        <Footer />
    </Router>
  );
}

export default App;
