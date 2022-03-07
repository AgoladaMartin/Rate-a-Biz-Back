const getDB = require('../../database/getDB');

const editBusiness = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Id del usuario:
        const { idUser } = req.params;

        // Campos del body que solicitamos y mensaje de error si falta algún campo:
        const { username, newEmail, name, url_web } = req.body;

        if (!username && !newEmail && !name && !url_web) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // Pedimos email y username del usuario:
        const [users] = await connection.query(
            `SELECT email, username FROM users WHERE id = ?`,
            [idUser]
        );

        //Apartado para modificar el email: se comprueba que no esté en uso por otro usuario y
        // si ya existe se lanza un mensaje de error:

        if (newEmail && newEmail !== users[0].email) {
            const [usersEmail] = await connection.query(
                `SELECT id FROM users WHERE email = ?`,
                [newEmail]
            );

            if (usersEmail.length > 0) {
                const error = new Error('Ya existe un usuario con ese email');
                error.httpStatus = 409;
                throw error;
            }

            // Se actualiza el usuario en la base de datos:
            await connection.query(
                `UPDATE users SET email = ?, modifiedAt = ? WHERE id = ?`,
                [newEmail, new Date(), idUser]
            );
        }

        // Modificación del username: se comprueba que no esté en uso por otro usuario y
        // si lo está se lanza mensaje de error:

        if (username && username !== users[0].username) {
            await connection.query(
                `UPDATE users SET username = ?, modifiedAt = ? WHERE id = ?`,
                [username, new Date(), idUser]
            );
        }

        // Modificación de datos del perfil:

        await connection.query(
            `UPDATE business SET name = ?, url_web = ?, modifiedAt = ? WHERE idUser = ?`,
            [name, url_web, new Date(), idUser]
        );

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editBusiness;