import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends PureComponent {

    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li className="nav-item" key="geoSortedShops">
                    <Link className="nav-link" to="/geoSortedShops">NearBy Shops </Link>
                </li>,
                 <li className="nav-item" key="preferedShops">
                 <Link className="nav-link" to="/preferedShops"> My preferred shops</Link>
             </li>,
              <li className="nav-item" key="signout">
              <Link className="nav-link" to="/signout">Sign Out</Link>
          </li>
            ];
        } else {
            return [
                <li className="nav-item" key="signin">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key="signup">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Header);
