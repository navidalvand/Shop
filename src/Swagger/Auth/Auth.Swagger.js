/**
 * @swagger
 *  paths:
 *   /auth/register:
 *     post:
 *       summary: Register Account
 *       tags: [Auth]
 *       description: Optional extended description in Markdown.
 *       parameters:
 *         - in: formData
 *           name: username
 *           required: true
 *           type: string
 *           minimum: 4
 *           maximum: 14
 *           description: Unique Username
 *         - in: formData
 *           name: email
 *           required: true
 *           type: string
 *           description: Unique Email
 *         - in: formData
 *           name: phoneNumber
 *           required: true
 *           type: string
 *           description: Unique Phone Number
 *         - in: formData
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 6
 *           maximum: 20
 *           description: Enter Your Password
 *         - in: formData
 *           name: confirm_password
 *           required: true
 *           type: string
 *           minimum: 6
 *           maximum: 20
 *           description: Enter Your Password Again
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */
