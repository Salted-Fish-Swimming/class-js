const { Class } = require('./index.js');

const Person = Class.from(({ s, p }) => ({
  init ({ age, name }) {
    p(this).name = name;
    p(this).age = age;
  },
  get name () {
    return p(this).name;
  },
  get age () {
    return p(this).age;
  },
  sayHello () {
    console.log('Hello!');
  }
}));

const Author = Class.extend(Person).from(({ s, p }) => ({
  init ({ name, books }) {
    p(this).books = books;
    s(s(this)).init.call(this, { name });
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

