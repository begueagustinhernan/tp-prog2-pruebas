import SinRegistrosDeKmsError from '../src/excepciones/kilometraje/sinRegistrosDeKmsError';

describe("Tests Clase SinRegistrosDeKmsError", () => {

  it("El constructor de la clase 'SinRegistrosDeKmsError' debe instanciar un objeto de tipo 'SinRegistrosDeKmsError'", () => {
    const error = new SinRegistrosDeKmsError("No hay registros de kilometros");
    
    expect(error).toBeInstanceOf(SinRegistrosDeKmsError);
  });

  it("El constructor de la clase 'SinRegistrosDeKmsError' debe instanciar un objeto de tipo 'Error'", () => {
    const error = new SinRegistrosDeKmsError("No hay registros de kilometros");
    
    expect(error).toBeInstanceOf(Error);
  });

  it("El constructor debe asignar correctamente el mensaje de error", () => {
    const mensaje = "No hay registros de kilometros";
    const error = new SinRegistrosDeKmsError(mensaje);
    
    expect(error.message).toBe(mensaje);
  });

  it("El constructor debe asignar el nombre 'SinRegistrosDeKmsError' al error", () => {
    const error = new SinRegistrosDeKmsError("No hay registros de kilometros");
    
    expect(error.name).toBe('SinRegistrosDeKmsError');
    expect(typeof error.name).toBe('string');
  });

  it("El constructor debe asignar el errorCode por defecto 40402 si no se especifica", () => {
    const error = new SinRegistrosDeKmsError("No hay registros de kilometros");
    
    const resultado = error.errorCode;
    const resultadoEsperado = 40402;
    
    expect(resultado).toBe(resultadoEsperado);
    expect(typeof resultado).toBe('number');
  });

  it("El constructor debe permitir asignar un errorCode personalizado", () => {
    const errorCodePersonalizado = 50000;
    const error = new SinRegistrosDeKmsError("No hay registros de kilometros", errorCodePersonalizado);
    
    const resultado = error.errorCode;
    
    expect(resultado).toBe(errorCodePersonalizado);
  });

  it("getMessage debe devolver el mensaje formateado correctamente", () => {
    const mensaje = "No hay registros de kilometros";
    const errorCode = 40402;
    const error = new SinRegistrosDeKmsError(mensaje, errorCode);
    
    const resultado = error.getMessage();
    const resultadoEsperado = `Error 'SinRegistrosDeKmsError': ${mensaje} - Codigo: ${errorCode}`;
    
    expect(resultado).toBe(resultadoEsperado);
    expect(typeof resultado).toBe('string');
  });

  it("getMessage debe incluir el errorCode personalizado en el mensaje", () => {
    const mensaje = "Error personalizado";
    const errorCode = 99999;
    const error = new SinRegistrosDeKmsError(mensaje, errorCode);
    
    const resultado = error.getMessage();
    
    expect(resultado).toContain('99999');
    expect(resultado).toContain(mensaje);
  });

  it("El error debe poder ser lanzado y capturado correctamente", () => {
    expect(() => {
      throw new SinRegistrosDeKmsError("Error de prueba");
    }).toThrow(SinRegistrosDeKmsError);
  });

  it("El error lanzado debe contener el mensaje correcto", () => {
    const mensaje = "Error de prueba";
    
    expect(() => {
      throw new SinRegistrosDeKmsError(mensaje);
    }).toThrow(mensaje);
  });
});