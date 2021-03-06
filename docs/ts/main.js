function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
var p = document.querySelector('#test');
p.textContent = greeter(user);
