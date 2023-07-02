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


/**
 * @swagger
 *  paths:
 *   /admin/categories/delete/{id}:
 *     delete:
 *       summary: Delete Category
 *       tags: [Admin , Admin-Categories]
 *       description: Delete Category From Admin Panel
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The Category ID
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /admin/categories/update/{id}:
 *     patch:
 *       summary: Update Category
 *       tags: [Admin , Admin-Categories]
 *       description: Update Category From Admin Panel
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The Category ID
 *        - in: formData
 *          name: title
 *          required: true
 *          description: The Category Title
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

