import { useEffect, useState } from "react"

const AltaDeCurso = () => {
    const [idCurso, setIdCurso] = useState("seleccione")
    const [cursoSelec, setCursoSelec] = useState("")
    const [cursos, setCursos] = useState([])


    // const a = cursos.cursos?.filter(el => el.id === parseInt(idCurso))
    // console.log(a)
    // console.log(cursos.cursos?.map(el=>el.tipo))
    // console.log(idCurso)
    // console.log(idCurso)

    const handleDescription = (event) => {
        const selectedId = event.target.value;
        if (selectedId === "seleccione") {
            setCursoSelec(null)
        } setIdCurso(selectedId);
    }

    // useEffect(() => {
    //     if (!cursos.length) {
    //         const url = `https://backend-iweb.onrender.com/api/v1/cursos`
    //         fetch(url)
    //             .then((response) => response.json())
    //             .then(data => {
    //                 setCursos(data)
    //             })
    //     }

    // }, [])

    useEffect(() => {
        if (!cursos.length) {
            const url = `https://backend-iweb.onrender.com/api/v1/cursos`;

            try {
                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`La solicitud GET a ${url} no se completó correctamente.`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        setCursos(data);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (idCurso !== "seleccione") {
            const cursoFil = cursos.cursos?.filter(el => el.id === parseInt(idCurso))
            setCursoSelec(cursoFil)
        }

    }, [idCurso])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const url = `https://backend-iweb.onrender.com/api/v1/cursos`
    //     fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify(cursoSelec?.[0]),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((res) => res.json())
    //         .catch((error) => console.error("Error:", error))
    //         .then((response) => console.log("Success:", response));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `https://backend-iweb.onrender.com/api/v1/cursos`;
    
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(cursoSelec?.[0]),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`La solicitud POST a ${url} no se completó correctamente.`);
            }
    
            const responseData = await response.json();
            console.log("Success:", responseData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <h2>alta de curso</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
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

                <label>Categoría: </label>
                <input type="text" value={cursoSelec?.[0]?.categoria || ""} readOnly />

                <label>Precio Mensual: </label>
                <input type="number" value={cursoSelec?.[0]?.precio_mensual || ""} readOnly />

                <button type="submit" disabled={idCurso === "seleccione" ? true : false}>Ingresar</button>
            </form>
        </section>
    )
}

export default AltaDeCurso

// Tareas

// 1. Arreglar este problema: console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. 😄👍

// 2. Hacer funcionalidad de crear curso osea hacer funcionar boton de ingresar. 😄👍

// 3. Modificar la descripción de un curso. 😄👍