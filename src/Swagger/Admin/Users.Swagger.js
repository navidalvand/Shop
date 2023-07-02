/**
 * @swagger
 *  paths:
 *   /admin/users/create:
 *     post:
 *       summary: Create Account
 *       tags: [Admin , Admin-Users]
 *       description: Create User From Admin Panel
 *       parameters:
 *         - in: formData
 *           name: username
 *           required: true
 *           type: string
 *           minimum: 4
 *           maximum: 14
 *           description: Your Username
 *         - in: formData
 *           name: email
 *           required: true
 *           type: string
 *           description: Your Email
 *         - in: formData
 *           name: phoneNumber
 *           required: true
 *           type: string
 *           description: Your Phone Number
 *         - in: formData
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 6
 *           maximum: 20
 *           description: Your Paswword
 *         - in: formData
 *           name: confirm_password
 *           required: true
 *           type: string
 *           minimum: 6
 *           maximum: 20
 *           description: Confirm Your Password
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /admin/users/update/{id}:
 *     patch:
 *       summary: Update Account
 *       tags: [Admin , Admin-Users]
 *       description: Update User From Admin Panel
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           description: Enter The User ID
 *           required : true
 *         - in: formData
 *           name: username
 *           type: string
 *           description: Your New Username
 *         - in: formData
 *           name: firstName
 *           type: string
 *           description: What Is Your First Name
 *         - in: formData
 *           name: lastName
 *           type: string
 *           description: What Is Your Last Name
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /admin/users/{id}:
 *     get:
 *       summary: Get Account
 *       tags: [Admin , Admin-Users]
 *       description: Update User From Admin Panel
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           description: Enter The User ID
 *           required : true
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */
