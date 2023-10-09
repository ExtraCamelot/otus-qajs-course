import { faker } from '@faker-js/faker';

const getNewUser = function (email, fullName, password) {
    this.email = email;
    this.fullName = fullName;
    this.password = password;
}

export const UserBuilder = function () {
    return {
        setEmail() {
            this.email = faker.internet.email();
            return this;
        },
        setFullName() {
            this.fullName = faker.person.fullName();
            return this;
        },
        setPassword() {
            this.password = faker.internet.password();
            return this;
        },
        build() {
            const user = new getNewUser(this.email, this.fullName, this.password);
            return user;
        }
    }
}   