import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../../node_modules/@material/layout-grid/dist/mdc.layout-grid.css"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `1.5rem`,
      alignItems: `center`
    }}
  >
    <nav style={{height: `54px`, backgroundColor: `lightgray`}}>
      <div className="mdc-layout-grid" style={{padding: `0`, height: `54px`}}>
        <div className="mdc-layout-grid__inner" style={{height: `54px`}}>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--align-middle">            
            <div style={{ marginLeft: `4rem`, 
                        fontSize: `1.1rem`, fontFamily: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                        color: `darkslategray`, fontWeight: `bold`}}>
              <img style={{height: `42px`, verticalAlign: `middle`, marginBottom: `0`}} src={`./me_small.png`} />
              Ryan Overton
            </div>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--align-middle">
            <div style={{ display: `flex`, justifyContent: `flex-end`, marginRight: `4rem`}}>              
              <Link to="/about"
                    style={{    
                      margin: `0 10px 0 10px`,                
                      color: `darkslategray`,
                      textDecoration: `none`,
                      fontFamily: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                      fontSize: `.9rem`,
                    }}>
                About
              </Link>
              <Link to="/blog"
                    style={{    
                      margin: `0 10px 0 10px`,                
                      color: `darkslategray`,
                      textDecoration: `none`,
                      fontFamily: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                      fontSize: `.9rem`,
                    }}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        backgroundImage: `url(./binary_wallpaper_green_1500_1000.jpg)`,
      }}
    >
      <h1 style={{ margin: 0,
            fontSize: `2.25rem`,
            textAlign: `center` }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,   
            fontWeight: `500`,         
            fontFamily: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
          }}
        >
          Developers Garage
        </Link>
      </h1>
      <h2
          style={{
            color: `white`,
            textDecoration: `none`,
            textAlign: `center`,  
            fontSize: `1.15rem`,   
            fontWeight: `normal`,  
            opacity: `.7`     ,
            fontFamily: `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,}} >Exploring cool tech, dev practices and tools used in development</h2>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
