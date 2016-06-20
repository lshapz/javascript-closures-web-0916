JavaScript Closures
---

## Objectives

1. Explain what a closure is
2. Explain how a closure works
3. Practice using a closure
4. Describe use cases for closures in JavaScript

## Introduction — About a Sandwich

Imagine you're making a sandwich.

![sandwich](https://curriculum-content.s3.amazonaws.com/skills-based-js/bread-food-plate-rucola.jpg)

Because you're a sandwich expert, you've buttered both sides of the bread before lightly toasting it.

Inside the sandwich, you've seasoned the tomatoes with just the right amounts of salt and pepper. You've fried the bacon to perfection, and you've perked up the lettuce with an ice-water bath.

Each of these ingredients brings its own preparation to the sandwich, and the slices of bread _close over_ the ingredients with their individual preparations.

It might be helpful to think of closures in the same way: just like the sandwich, a closure (in the analogy above, an individual ingredient or even the toast) "remembers" the environment in which it was created. The toast might not have direct access to the tomatoes' salt and pepper, but each ingredient brings its environment along with it to make the sandwich what it is.

## A closure *closes over* its environment

- Feel free to reuse the sandwich metaphor as much as you'd like

When we say, "A closure closes over its environment," we mean that it keeps track of the variables it had access to when it was created.

- Walk through simple example, perhaps based on the first one at MDN:

``` javascript
function init() {
  var name = "Chuck"
  function logName() {
    console.log(name)
  }
  logName()
}

init()
```

## How does a closure work?

- Explain relationship between closures and function-level scope in JavaScript.
  - JavaScript's function-level scoping means that closures are pretty easy to reason about: variables are hoisted to the top of their current context (function), and any functions declared in that context have access to those variables

- Explain pitfalls of using closures as a result
  - Updating a shared variable in one closure affects the variable in other closures:

  ```javascript
  function close() {
    var x = 5

    function add() {
      return ++x
    }

    function subtract() {
      return --x
    }

    return { add, subtract }
  }

  var { add, subtract } = close()

  add() // 6
  subtract() // 5
  subtract() // 4
  add () // 5
  // etc.
  ```
  - Allocating functions has a performance penalty
  - Closures can be a source of memory leaks (e.g., closed over variables might not get GC-ed because can't determine whether they're still in use -- see https://github.com/facebook/react/issues/2988)

## How/why use closures?

- Demonstrate the usefulness of closures in modularizing functions or abstracting away implementation details
- Mention emulating private methods
- Mention partial function application and currying

## Resources

- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Closures](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/#one-codescopecode-value-for-them-all)
