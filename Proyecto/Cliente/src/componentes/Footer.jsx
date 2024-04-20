import React from 'react'
import { Link } from 'react-router-dom'
import '../cssComponents/Footer.css'
const Footer = () => {
return (
    <div className='foot'>
        
        <footer className="footer">
        <div className="container">
            <div className="footer-row">
                <div className="footer-link">
                    <h4>Compañia</h4>
                    <ul>
                        <li><Link to="/home/acercadenosotros">Acerca de nosotros</Link></li>
                    </ul>
                </div> 

                <div className="footer-link">

                    <h4>Siguenos</h4>
                    <div className="social-link">

                    <Link to="/"><strong>f</strong></Link><i className="fab fa-facebook-f"></i>
                    <Link to="/"><strong>IG</strong></Link><i className="fab fa-instagram"></i>

                    </div>
                </div>
            </div>

        </div>
    </footer>
    </div>
)
}

export default Footer
