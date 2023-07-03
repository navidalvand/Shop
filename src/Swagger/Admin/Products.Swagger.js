/**
 * @swagger
 *  paths:
 *   /admin/products/create:
 *     post:
 *       summary: Create Product
 *       tags: [Admin , Admin-Products]
 *       description: Create Product From Admin Panel
 *       parameters:
 *        - in: formData
 *          name: title
 *          required: true
 *          minimum: 8
 *          maximum: 60
 *          type: string
 *        - in: formData
 *          name: description
 *          required: true
 *          maximum: 500
 *          minimum: 6
 *          type: string
 *        - in: formData
 *          name: category
 *          required: true
 *          type: string
 *        - in: formData
 *          name: type
 *          required: true
 *          enum: [buy , exchange , sell]
 *          type: string
 *        - in: formData
 *          name: city
 *          required: true
 *          type: string
 *        - in: formData
 *          name: address
 *          maximum: 200
 *          minimum: 6
 *          required: true
 *          type: string
 *        - in: formData
 *          name: price
 *          required: true
 *          type: string
 *        - in: formData
 *          name: contact
 *          maximum: 200
 *          minimum: 6
 *          required: true
 *          type: string
 *        - in: formData
 *          description: You Can Upload More Than Only One Image But Its not Possible From Swagger :)
 *          name: images
 *          maximum: 12
 *          required: true
 *          type: file
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/all:
 *     get:
 *       summary: Get All Products
 *       tags: [Admin , Admin-Products]
 *       description: Get All Products From Admin Panel
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/{id}:
 *     get:
 *       summary: Get A Product By ID
 *       tags: [Admin , Admin-Products]
 *       description: Get A Product By ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/delete/{id}:
 *     delete:
 *       summary: Delete A Product By ID
 *       tags: [Admin , Admin-Products]
 *       description: Delete A Product By ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/update/{id}:
 *     patch:
 *       summary: Update A Product By ID
 *       tags: [Admin , Admin-Products]
 *       description: Update A Product By ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *        - in: formData
 *          name: title
 *        - in: formData
 *          name: description
 *        - in: formData
 *          name: category
 *        - in: formData
 *          name: type
 *        - in: formData
 *          name: city
 *        - in: formData
 *          name: address
 *        - in: formData
 *          name: price
 *        - in: formData
 *          name: contact
 *        - in: formData
 *          name: images
 *          type : file
 *          description: You Can Upload More Than Only One Image But Its Not Possible In Swagger :)
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/accept/{id}:
 *     get:
 *       summary: Accept A Product By ID
 *       tags: [Admin , Admin-Products]
 *       description: Accept A Product By ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/products/reject/{id}:
 *     get:
 *       summary: Reject A Product By ID
 *       tags: [Admin , Admin-Products]
 *       description: Reject A Product By ID From Admin Panel
 *       parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */
