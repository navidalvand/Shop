/**
 * @swagger
 *  paths:
 *   /admin/comments/create/{id}:
 *     post:
 *       summary: Create Comment Under Product
 *       tags: [Admin , Admin-Comments]
 *       description: Create Comment Uder Product By Product ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *          description: Product ID
 *        - in: formData
 *          name: text
 *          required: true
 *          description: Comment Value
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/comments/delete/{id}:
 *     delete:
 *       summary: Delete Comment Under Product
 *       tags: [Admin , Admin-Comments]
 *       description: Delete Comment Uder Product By Comment ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *          description: Comment ID
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/comments/all:
 *     get:
 *       summary: Get All Comments
 *       tags: [Admin , Admin-Comments]
 *       description: Get All Comments From Admin Panel
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */
