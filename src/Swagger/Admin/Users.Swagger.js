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
 *       description: Get User From Admin Panel
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


/**
 * @swagger
 *  paths:
 *   /admin/users/all:
 *     get:
 *       summary: Get All Accounts
 *       tags: [Admin , Admin-Users]
 *       description: Get All Users From Admin Panel
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */


/**
 * @swagger
 *  paths:
 *   /admin/users/delete/{id}:
 *     delete:
 *       summary: Delete Account
 *       tags: [Admin , Admin-Users]
 *       description: delete User From Admin Panel
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */

/**
 * @swagger
 *  paths:
 *   /admin/users/change-role/{id}:
 *     patch:
 *       summary: Update Account Access Role
 *       tags: [Admin , Admin-Users]
 *       description: Change User Role From Admin Panel
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *        - in: formData
 *          name: role
 *          required: true
 *          description: User Role
 *          enum: [OWNER, DEV , ADMIN , USER]
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Bad Request
 */
