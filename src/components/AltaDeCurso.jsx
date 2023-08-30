import { useEffect, useState } from "react"

const AltaDeCurso = () => {
    const [idCurso, setIdCurso] = useState("")
    const [cursoSelec, setCursoSelec] = useState("")
    const [cursos, setCursos] = useState([])


    // const a = cursos.cursos?.filter(el => el.id === parseInt(idCurso))
    // console.log(a)
    // console.log(cursos.cursos?.map(el=>el.tipo))

    // console.log(cursoSelec)
    // console.log(idCurso)

    const handleDescription = (event) => {
        const selectedId = event.target.value;
        if (selectedId === "seleccione") {
            setCursoSelec(null)
        } setIdCurso(selectedId);
    }

    useEffect(() => {
        if (!cursos.length) {
            const url = `https://backend-iweb.onrender.com/api/v1/cursos`
            fetch(url)
                .then((response) => response.json())
                .then(data => {
                    setCursos(data)
                })
        }

    }, [])

    useEffect(() => {
        if (idCurso !== "seleccione") {
            const cursoFil = cursos.cursos?.filter(el => el.id === parseInt(idCurso))
            setCursoSelec(cursoFil)
        }

    }, [idCurso])

    return (
        <section>
            <h2>alta de curso</h2>
            <form>
                <label>Descripción: </label>
                <select onChange={handleDescription}>
                    <option value="seleccione">Seleccione un curso</option>
                    {
                        cursos.cursos?.map((el) =>
                            <option key={el.id} value={el.id}>
                                {el.descripcion}
                            </option>
                        )
                    }
                </select>

                <label>Tipo: </label>
                <input value={cursoSelec?.[0]?.tipo || ""} readOnly />
                {/* <input value={idCurso !== "seleccione" ? cursoSelec?.[0]?.tipo : ""} readOnly /> */}

                <label>Categoría: </label>
                <input type="text" value={cursoSelec?.[0]?.categoria || ""} readOnly />
                {/* <input type="text" value={idCurso !== "seleccione" ? cursoSelec?.[0]?.categoria : ""} readOnly /> */}

                <label>Precio Mensual: </label>
                <input type="number" value={cursoSelec?.[0]?.precio_mensual || ""} readOnly />
                {/* <input type="number" value={idCurso !== "seleccione" ? cursoSelec?.[0]?.precio_mensual : ""} readOnly />  */}

                <button type="submit">Ingresar</button>
            </form>
        </section>
    )
}

export default AltaDeCurso

// Tareas

// 1. Arreglar este problema: console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. 😄👍

// 2. Hacer funcionalidad de crear curso osea hacer funcionar boton de ingresar.

// 3. Modificar la descripción de un curso.