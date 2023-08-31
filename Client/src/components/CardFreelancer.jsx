import { Link } from "react-router-dom";


export default function CardFreelancer(props) {

    return (
        <div>
            <Link>
                <img src="IMAGEN" />
                <section>
                    <h1>NOMBRE Y APELLIDO</h1>
                    <h3>EDAD</h3>
                    <h3>PAIS</h3>
                    <h4>DESCRIPCION DEL TRABAJO</h4>
                </section>
            </Link>
        </div>
    )
}