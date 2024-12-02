import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const updateUser = async (id, nombre, edad, usuario) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('id', mssql.Int, id)
      .input('nombre', mssql.VarChar, nombre)
      .input('edad', mssql.Int, edad)
      .input('usuario', mssql.VarChar, usuario)
      .query(
        `
        UPDATE Usuario 
        SET nombre = @nombre, 
            edad = @edad, 
            usuario = @usuario
        WHERE id = @id;
        `
      )
    return query
  } catch (error) {
    return new Error(error)
  }
}

export { updateUser }
