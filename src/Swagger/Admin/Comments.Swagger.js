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
