
import { BrowserRouter,Routes,Route } from "react-router-dom";

import './App.css';
import Info from './Info';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    return (
        
       <div>
          <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Weather />}></Route>
            <Route path="/info" element={<Info/>}> </Route>
            
          </Routes>
          
          </BrowserRouter>
       

          </div>    
          
      );
}

export default App;
