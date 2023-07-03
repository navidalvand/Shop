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
