
<a name="AltaDeCurso"></a>

## AltaDeCurso() ⇒ <code>JSX.Element</code>
Componente AltaDeCurso para la creación de cursos.

**Kind**: global function
**Returns**: <code>JSX.Element</code> - Elemento JSX que representa el formulario de alta de cursos.

* [AltaDeCurso()](#AltaDeCurso) ⇒ <code>JSX.Element</code>
    * [~handleDescription(event)](#AltaDeCurso..handleDescription)
    * [~handleSubmit(e)](#AltaDeCurso..handleSubmit)

<a name="AltaDeCurso..handleDescription"></a>

### AltaDeCurso~handleDescription(event)
Maneja el cambio en la selección de cursos.

**Kind**: inner method of [<code>AltaDeCurso</code>](#AltaDeCurso)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Evento de cambio en el select. |

<a name="AltaDeCurso..handleSubmit"></a>

### AltaDeCurso~handleSubmit(e)
Maneja el envío del formulario para crear un nuevo curso.

**Kind**: inner method of [<code>AltaDeCurso</code>](#AltaDeCurso)

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | Evento de envío del formulario. |

# Componente `AltaDeCurso` para la creación de cursos

## Descripción
El componente `AltaDeCurso` permite la creación de cursos a través de un formulario. El formulario incluye la selección de cursos disponibles, y al seleccionar uno, se muestran detalles del curso como tipo, categoría y precio mensual.

## Uso
```jsx
import { useEffect, useState } from "react"

/**
 * Componente AltaDeCurso para la creación de cursos.
 * @returns {JSX.Element} Elemento JSX que representa el formulario de alta de cursos.
 */
const AltaDeCurso = () => {
    // Estado para el ID del curso seleccionado.
    const [idCurso, setIdCurso] = useState("seleccione")
    // Estado para almacenar los detalles del curso seleccionado.
    const [cursoSelec, setCursoSelec] = useState("")
    // Estado para almacenar la lista de cursos disponibles.
    const [cursos, setCursos] = useState([])

    /**
     * Maneja el cambio en la selección de cursos.
     * @param {Object} event - Evento de cambio en el select.
     */
    const handleDescription = (event) => {
        const selectedId = event.target.value;
        if (selectedId === "seleccione") {
            // Si se selecciona "seleccione", limpiamos los detalles del curso.
            setCursoSelec(null)
        } setIdCurso(selectedId);
    }

    /**
    * Efecto para cargar la lista de cursos desde el servidor al montar el componente.
    */
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

    /**
    * Efecto para actualizar el curso seleccionado cuando cambia el ID del curso.
    */
    useEffect(() => {
        if (idCurso !== "seleccione") {
            const cursoFil = cursos.cursos?.filter(el => el.id === parseInt(idCurso))
            setCursoSelec(cursoFil)
        }

    }, [idCurso])

    /**
   * Maneja el envío del formulario para crear un nuevo curso.
   * @param {Object} e - Evento de envío del formulario.
   */
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
            // Muestra la alerta después de que la solicitud se haya completado con éxito.
            alert("curso creado")
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <h2>Alta de curso</h2>
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