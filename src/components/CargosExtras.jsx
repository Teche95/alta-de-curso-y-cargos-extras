
const CargosExtras = () => {
  return (
    <section>
      <h2>cargos extras</h2>
      <form>
        <label>Fecha: </label>
        <input type="date" />

        <label>Concepto: </label>
        <input type="text" />

        <label>Alumno: </label>
        <input type="text" />


        <label>Importe: </label>
        <input type="number" />

        <button type="submit">Ingresar</button>
      </form>
    </section>
  )
}

export default CargosExtras