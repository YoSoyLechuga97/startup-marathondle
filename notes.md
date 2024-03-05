This is my notes page for CS260!

FIRST OFF: Make sure to push at the end of every assignment, not just commit.

I have officially started my server through AWS

IP addresses allow me to log into the website from an http://
My personal website is at http://100.26.112.80/
I can ssh into it with my .pem key (located currently on my laptop and in my private ssh)
From the ssh there are files I can access and manipulate.

I have relearned a great deal about html!
To start: it really is just a mark-up language. Theres not much in terms of coding happening, rather we are just making detailed claimes about types of text and how we want it to be approached and designed, honestly so far it makes a whole lot of sense! Everything is divided by calling it ie <div> or something like that, and then closing it ie </div>.

<h2>JavaScript</h2>

I am beginning to learn about JavaScript, here's a few key things that I have learned right from the start:
<ul>
  <li>Unlike C++ and other languages you do not need to declare the variable type right off the bat, though it probably is good practice to.</li>
  <li>Array's have a ton of static functions that make them very useful</li>
  <li>A great deal of javascript gets sent to the <strong>console</strong>, it's like the terminal of other coding where we can read output from the code</li>
</ul>

JavaScript uses regex (regular expressions) and has some built in methods that can be used to help with it, the way I understand that you can create a regex is this:
const variableName = /(wordToFind)|(otherWord).../flags;
I think it is valuable to learn some of the flags for the sake of better usage skills, here are some of them that I have learned:
<ul>
  <li><strong>g</strong> -> this flag stands for 'global' and indicates that the regular expression should search for <i>all</i> instances of the pattern in the input string, not stop at the first</li>
  <li><strong>i</strong> -> this flag stands for 'ignore case' and indicates that the regular expression should ignore the case of letters, for example both "Dog" and "dog" would match.</li>
  <li><strong>m</strong> -> this flag stands for multiline and indicates that the regular expression should treat the input string as multiple lines.</li>
</ul>

<h3>Rest vs Spread</h3>

JavaScript uses 'rest' to put the remaining variables entered into a function into an array by leading it with three dots (think of it like using the 'rest' of the variables for this).<strong>This can only be done for the last variable of a function</strong> Here's and example:
```ruby
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```
Spread does the opposite and will take an array and split all of the indexes into seperate varables. Here's and example: 
```ruby
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```
<h3>JSON</h3>

JSON is a simple and effective way to store and share data. It is a document that can contain either a string, number, boolean, array, object, or be null. It is most notably used to contain objects, they are similar to maps in that they have a key that is paired to a different value. Here is an example of a JSON document:
```ruby
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
```
This can be converted to JavaScript using JSON.parse(), and JavaScript can be made into JSON through JSON.parse(), here is an example:
```ruby
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```

<h3>Objects and Classes</h3>

Objects seem to be a crucial part of JavaScript and, similar to maps, use key pairs to hold information. The key of the key pairs <strong>must be of stype String of Symbol</strong> but the value can be any type (including arrays, functions, etc.). Here is an example of an object, notice how different types can be stored in the same object:
```ruby
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```
There are a few static functions that are important to know/use with objects:
<ul>
  <li><strong>entries</strong> -> Returns an array of key value pairs</li>
  <li><strong>keys</strong> -> Returns an array of keys</li>
  <li><strong>values</strong> -> Returns an array of (you guessed it) values</li>
</ul>

```ruby
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```
Constructors are also an important part of objects, any function that returns an object is considered a contructor and can be invoked with the 'new' operator.
```ruby
function Person(name) {
  return {
    name: name,
  };
}

const p = new Person('Eich');
console.log(p);
// OUTPUT: {name: 'Eich'}
```
You can also create methods on the object as part of the encapsulation (because any type can be in the value). Consider the following:
```ruby
function Person(name) {
  return {
    name: name,
    log: function () {
      console.log('My name is ' + this.name);
    },
  };
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```
We also need ot look at classes to define objects-this becomes very useful when we want to inherit from parent classes. Consider this example where we have a Person class:
```ruby
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```
When we inherit from the parent, we must use 'super' to access parent's functions or parameters, look at the way Employee inherits from Person:
```ruby
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    return 'My name is ' + this.name;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUTPUT: My name is Eich. I am a programmer
```
