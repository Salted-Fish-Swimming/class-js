const { Class } = require('./index.js');

const Person = Class.from({
  new ({ age, name }) {
    this.__name__ = name;
    this.__age__ = age;
  },
  get name () {
    return 'Person';
  },
  get age () {
    return this.__age__;
  },
  sayHello () {
    console.log('Hello!');
  }
});

const Author = Class.extend(Person).from(({ s, p }) => ({
  new ({ name, books }) {
    p(this).name = name;
    p(this).books = books;
  },
  get name () {
    return p(this).name;
  },
  get books () {
    return p(this).books;
  },
}));

const Hemingway = Author.new({
  name: 'Hemingway',
  books: [ 'The Old Man and the Sea' ]
});

Hemingway.sayHello();

console.log(Hemingway);
console.log(Hemingway.name);
Hemingway.name = 'zhangsan';
console.log(Hemingway.name);

console.log(Hemingway.books);
Hemingway.books = 'nothing';
console.log(Hemingway.books);

