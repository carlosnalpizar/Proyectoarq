import React from 'react';
import '../css/404.css';
import '../css/App.css'

const Index = () => {
    return (
        <div className="u-section-1">
        <div alt="" className="u-image u-image-circle u-image-contain u-image-1" data-image-width="1024" data-image-height="1024"></div>
        <h1 className="u-text-1">Página no encontrada</h1>
        <h3 className="u-text-2">Disculpa la interrupción. El apartado que estas buscando no existe :( </h3>
        <p className="u-text-3">¿Deseas volver a la página de inicio? <a href="/home" style={{textDecoration: 'underline', color: '#000000'}}>Presiona aquí</a></p>
        </div>
    );
}

export default Index;