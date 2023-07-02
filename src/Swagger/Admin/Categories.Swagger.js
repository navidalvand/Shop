/**
 * @swagger
 *  paths:
 *   /admin/categories/create:
 *     post:
 *       summary: Create Category
 *       tags: [Admin , Admin-Categories]
 *       description: Create Category From Admin Panel
 *       parameters:
 *        - in: formData
 *          name: title
 *          required: true
 *          description: The Category Title
 *       responses:
 *         201:
 *           description: Created
 *         400:
 *           description: Bad Request
 */
