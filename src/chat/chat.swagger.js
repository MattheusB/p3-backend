/**
 * @swagger
 *
 * definitions:
 *  Chat:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              example: 1
 *          IdUser1:
 *              type: integer
 *              example: 1
 *          IdUser2:
 *              type: integer
 *              example: 2
 *
 * /chat:
 *  get:
 *     tags:
 *      - Chats
 *     summary: Chats do sistema
 *     description: Retorna um array do tipo JSON contendo todos os chats
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Array com todos os chats
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Chat'
 * 
 *  post:
 *     tags:
 *      - Chats
 *     summary: Adiciona um novo chat ao sistema
 *     description: Retorna uma mensagem confirmando que o chat especificado foi adicionado
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: New Chat
 *        in: body
 *        description: Dados do novo chat
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Chat'
 *     responses:
 *       200:
 *         description: Chat adicionado com sucesso
 *
 *
 * /chat/{id}:
 *  get:
 *      tags:
 *          - Chats
 *      summary: Um dos chats do sistema
 *      description: Retorna o chat com o id especificado
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do chat existente
 *      responses:
 *          200:
 *              description: Chat existente
 *              schema:
 *                  $ref: '#/definitions/Chat'
 *
 *  put:
 *      tags:
 *          - Chats
 *      summary: Atualiza um chat existente no sistema
 *      description: Retorna uma mensagem confirmando a atualização nos dados do chat
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do chat que deseja mudar os dados
 *          - name: Update
 *            in: body
 *            description: Dados do chat a serem atualizados
 *            schema:
 *              $ref: '#/definitions/Chat'
 *      responses:
 *          200:
 *              description: Chat atualizado
 *
 *  delete:
 *      tags:
 *          - Users
 *      summary: Excluir chat do sistema
 *      description: Retorna uma mensagem confirmando a exclusão do chat
 *      produces:
 *          - string
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Id do chat cadastrado
 *      responses:
 *          200:
 *              description: Chat excluído
 */