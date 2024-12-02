import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const createUser = async (nombre, edad, usuario, passwd, role) => {
  try {
    const connection = await getConnection()
    console.log(nombre, edad, usuario, passwd)
    const query = await connection
      .request()
      .input('nombre', mssql.VarChar, nombre)
      .input('edad', mssql.Int, edad)
      .input('usuario', mssql.VarChar, usuario)
      .input('passwd', mssql.VarChar, passwd)
      .input('role', mssql.VarChar, role)
      .query(
        `
          INSERT INTO Usuario(nombre, edad, usuario, passwd, role)
          VALUES(@nombre, @edad, @usuario, @passwd, @role);
        `
      )
    return query
  } catch (error) {
    return new Error(error)
  }
}

export { createUser }
