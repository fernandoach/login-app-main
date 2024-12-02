import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const getUserByUsername = async (usuario) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('usuario', mssql.VarChar, usuario)
      .query(
        `
          SELECT nombre, edad, usuario, passwd, role
          FROM Usuario 
          WHERE Usuario.usuario = @usuario;
        `
      )
    return query.recordset
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { getUserByUsername }
