import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import FrontDashboard from './pages/FrontDashboard'
import AoDashboard from './pages/AoDashboard'
import CgDashboard from './pages/CgDashboard'
import CgSearch from './pages/CgSearch'
import SoDashboard from './pages/SoDashboard'
import FrontSearch from './pages/FrontSearch'
import AoSearch from './pages/AoSearch'
import AoPostalDetails from './pages/AoPostalDetails';
import SoPostalDetails from './pages/SoPostalDetails';
import SoSearch from './pages/SoSearch'
import CgPostalDetails from './pages/CgPostalDetails';
import Logout from './pages/Logout';


function App() {
  return (
    <>
     <Router>
        <Switch>
           <Route path="/" component={Login} exact />
           <Route path="/logput" component={Logout} exact/>
           <Route path="/admin_dashboard" component={AdminDashboard} exact />
           <Route path="/front_dashboard" component={FrontDashboard} exact />
           <Route path="/front_search" component={FrontSearch} exact />
           <Route path="/ao_dashboard" component={AoDashboard} exact />
           <Route path="/ao_search" component={AoSearch} exact />
           <Route path="/ao_details" component={AoPostalDetails} exact />
           <Route path="/cg_dashboard" component={CgDashboard} exact />
           <Route path="/cg_search" component={CgSearch} exact />
           <Route path="/cg_details" component={CgPostalDetails} exact />
           <Route path="/so_dashboard" component={SoDashboard} exact />
           <Route path="/so_search" component={SoSearch} exact />
           <Route path="/so_details" component={SoPostalDetails} exact />
 
        </Switch>
      </Router>
    </>
  );
}

export default App;
