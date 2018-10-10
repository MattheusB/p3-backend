/**
 * @swagger
 *
 * definitions:
 *  Credenciais:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              example: mattheusbritor@gmail.com
 *          password:
 *              type: string
 *              example: password12
 *      required:
 *          - email
 *          - password
 *
 * /login:
 *
 *   post:
 *     tags:
 *      - Login
 *     summary: O cliente faz login no sistema
 *     description: Retorna uma mensagem confirmando se o usuário conseguiu logar no sistema ou não
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: Credenciais
 *        in: body
 *        description: Email e senha de um usuário que já esteja cadastrado no sistema
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Credenciais'
 *     responses:
 *       200:
 *         description: Login realizado.
 *
 *   delete:
 *     tags:
 *      - Login
 *     summary: O cliente faz logout no sistema
 *     description: Retorna uma mensagem confirmando se o usuário conseguiu deslogar no sistema ou não
 *     produces:
 *      - application/json
 *     responses:
 *        200:
 *          description: Logout realizado.
 *
 *
 * /login/verify:
 *   get:
 *     tags:
 *      - Login
 *     summary: Verifica se o usuário está logado
 *     description: Retorna as informações do usuário logado
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: O usuário está logado
 */