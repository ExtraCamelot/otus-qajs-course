import { faker } from "@faker-js/faker";

let getNewUser = function (email, fullname, password){
    this.email = email;
    this.fullname = fullname;
    this.password = password;
}


export const UserBuilder = function () {
return {
 setName() {   
    this.fullname = faker.person.fullName();
    return this;
 },   
 setEmail() { 
    this.email = faker.internet.email();
    return this;
},  
setPassword() {
    this.password =faker.internet.password();
    return this;   
}, 
build() 
{
const user = new getNewUser(this.email, this.fullname, this.password);
return user;
}  
}
}
