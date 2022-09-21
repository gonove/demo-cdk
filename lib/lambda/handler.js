
exports.guardarSaludo = async ( event ) => {

    console.log( 'Guardar Saludo lambda')
    
    return {
        statusCode  : 200,
        body        : 'something'
    }
}
