import logo from './logo.png';
import './NavBar.css';

function NavBar( SchoolName) {
  return (
    <div className="NavBar">
      <nav>
        <div class="logo">
            <img src={logo} className=
            "logo" alt="logo"/>
        </div>
        <div>
        <li> <a>{SchoolName.name}</a></li>
        </div>
        <div class="nav">
            <ul class="nav-list">
              
                <li><a class="active" href="#">Home</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Service</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Log Out</a></li>
            </ul>

        </div>
    </nav>
    </div>
  );
}

export default NavBar;
