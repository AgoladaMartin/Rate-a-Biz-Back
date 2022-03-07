const getDB = require('../../database/getDB');

const getBusiness = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id del usuario del que queremos obtener la info.
        const { idUser } = req.params;

        // Obtenemos el id del usuario que realiza la request.
        const idReqUser = req.userAuth.id;

        // Obtenemos todos los datos que me interesan de la empresa de la cuál
        // se solicita información.

        const [business] = await connection.query(
            `SELECT name, url_web FROM business WHERE idUser = ?`,
            [idUser]
        );

        // Objeto con la información básica de la empresa.

        const businessInfo = {
            name: business[0].name,
            url_web: business[0].url_web,
        };

        // Obtenemos todos los datos registrados en la tabla de usuario/empresa del cuál
        // se solicita información.

        const [users] = await connection.query(
            `SELECT id, username, email, avatar, role, createdAt FROM users WHERE id = ?`,
            [idUser]
        );

        // Objeto con la información básica como usuario/empresa.

        const userInfo = {
            username: users[0].username,
            avatar: users[0].avatar,
        };

        // Si el usuario que realiza la request es el dueño de dicho usuario/empresa o si es
        // un administrador vamos a agregar información extra.

        if (users[0].id === idReqUser || req.userAuth.role === 'admin') {
            userInfo.email = users[0].email;
            userInfo.role = users[0].role;
            userInfo.createdAt = users[0].createdAt;
        }

        res.send({
            status: 'ok',
            data: {
                businessInfo: businessInfo,
                userInfo: userInfo,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getBusiness;