/**
 * @swagger
 *  paths:
 *   /auth/register:
 *     post:
 *       summary: Register Account
 *       tags: [Auth]
 *       description: Create Account For The First Time
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
 *         201:
 *           description: Account Registered
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /auth/login:
 *     post:
 *       summary: Login Account
 *       tags: [Auth]
 *       description: Login To An Existed Account
 *       parameters:
 *         - in: formData
 *           name: username
 *           required: true
 *           type: string
 *           minimum: 4
 *           maximum: 14
 *           description: Your Username
 *         - in: formData
 *           name: password
 *           required: true
 *           type: string
 *           description: Your Password
 *       responses:
 *         200:
 *           description: Logged In
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /auth/logout:
 *     post:
 *       summary: Logout Account
 *       tags: [Auth]
 *       description: Logout From An Existed Account
 *       responses:
 *         200:
 *           description: Logged Out
 *         400:
 *           description: Bad Request
 */