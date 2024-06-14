import React from 'react';

const Aside: React.FC =() => {
    return(
        <aside>
            <div className='container'>
                <h3>Utilidades</h3>
                <nav>
                    <ul>
                        <li><a href='#'> Quienes somos</a></li>
                        <li><a href='#'>Utilidad de la app</a></li>
                        <li><a href='#'> Proyectos</a></li>
                    </ul>
                </nav>
            </div>
        </aside>
    );

};

export default Aside;