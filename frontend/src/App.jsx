
import './App.css'
import Home from './pages/Home/home.jsx';
// import Login from './pages/login.jsx';
// import SignUp from './pages/Signup/Signup.jsx';

function App(){
  return (
      //here "h-screen" means height is equal to full screen
      <div className="p-4 h-screen flex items-center justify-center"> 
            {/* <SignUp/> */}
            <Home/>
      </div>
  )
}

export default App;
