// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee {
      
      constructor(name,id,email, username) {
            super(name, id, email)
            this.username = this.username;
      }

      getGitHub() {
            return this.username
      }

      getRole() {
            return 'Engineer'
      }
}



module.exports = Engineer