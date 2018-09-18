/**
 * @swagger
 *
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: usuario1
 *          email:
 *              type: string
 *              example: usuario1.gmail.com
 *          foto:
 *              type: string
 *              example: foto1
 *          informacoes:
 *              type: string
 *              example: Pug muito lindo etc
 *          matched:
 *              type: array
 *              items:
 *                  type: integer
 *
 * /user:
 *  get:
 *     tags:
 *      - Users
 *     summary: Usuários cadastrados no sistema
 *     description: Retorna um array do tipo JSON contendo todos os usuários
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Array com todos os usuários
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/User'
 *
 *  post:
 *     tags:
 *      - Users
 *     summary: Adiciona um novo usuário ao sistema
 *     description: Retorna uma mensagem confirmando que o usuário especificado foi adicionado
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: New User
 *        in: body
 *        description: Dados do novo usuário
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Usuário adicionado com sucesso
 *
 * /user/{id}:
 *  get:
 *      tags:
 *          - Users
 *      summary: Um dos usuários cadastrados
 *      description: Retorna o usuário com o id especificado
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do usuário existente
 *      responses:
 *          200:
 *              description: Usuário cadastrado
 *              schema:
 *                  $ref: '#/definitions/User'
 *
 *  put:
 *      tags:
 *          - Users
 *      summary: Atualiza um usuário já cadastrado
 *      description: Retorna uma mensagem confirmando a atualização nos dados do usuário
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do usuário que deseja mudar os dados
 *          - name: Update
 *            in: body
 *            description: Dados do usuário a serem atualizados
 *            schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          200:
 *              description: Usuario atualizado
 *
 *  delete:
 *      tags:
 *          - Users
 *      summary: Excluir usuário do sistema
 *      description: Retorna uma mensagem confirmando a exclusão do usuário
 *      produces:
 *          - string
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do usuário cadastrado
 *      responses:
 *          200:
 *              description: Usuário excluído
 */