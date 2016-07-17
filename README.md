JavaScript Closures
---

## Objectives

1. Explain what a closure is
2. Explain how a closure works
3. Practice using a closure
4. Describe use cases for closures in JavaScript

## Introduction — The Spy Who Ate Me

![Fat Bastard](https://66.media.tumblr.com/c22f08b92534e472c9bf987bb1ee5888/tumblr_mn7jmySprl1srsy9vo1_500.gif)

Let's talk about one of my favorite characters in the Austin Powers movies: [Fat Bastard](https://en.wikipedia.org/wiki/Fat_Bastard_(character))
and his gluttonous appetite. If you haven't seen those movies yet, you should do so now. If it makes you feel better,
pretend they're required viewing for this course!

In the movie, Fat Bastard wants to eat Mini-Me. Let's make this dream come true for our chubby assassin friend.

## What's for dinner?

We'll represent Fat Bastard using a function that takes one argument, the thing he's going to eat:

```js
function fatBastard(meal) {

}
```

Next, we'll add a way for Fat Bastard to tell us what he's having for dinner, by returning a function. We can then assign
the returned function to a variable, and call it when we want to know what type of food we gave Fat Bastard for dinner.

```js
function fatBastard(meal) {
  function whatsForDinner() {
    if (meal === 'Mini-Me') {
      console.log('The wee man is in my belly!');
    } else {
      console.log(`I'm eatin' a bit of ${meal}! Burp.`);
    }
  }

  return whatsForDinner;
}
```

`whatsForDinner()` is an inner function of the `fatBastard()` function, and as such, it has access to all of the variables
defined in the `fatBastard()` function (as well as the variables in its own scope, if it had any). This means that we
can access the `meal` argument in our `whatsForDinner()` function too. However, `meal` isn't accessible _outside_ of
the `fatBastard()` function, giving us some semblance of 'private' variables. This is one possible use case for closures.

As you can see, we're not executing the `whatsForDinner()` function here, we're merely returning it. We can then run
the `whatsForDinner()` function at a later point in time, when we're curious about what exactly is in Fat Bastard's belly.

The feature allowing `whatsForDinner()` to still access the variables within its parent function long after the parent
function has executed, is called a 'closure'. In this case, the `fatBastard()` function is a closure.

![Fat Bastard in a moment of spiritual clarity.](https://66.media.tumblr.com/11911f29151cb0ff4813f9d11689cdc8/tumblr_mvjxzdTtV91ror07qo1_500.gif)

To prove that Fat Bastard can still let us know what is in his belly after he's eaten it, let's feed him a nice, juicy
steak.

```js
const whatsForDinner = fatBastard('Kobe beef');
whatsForDinner(); // prints 'I'm eatin' a bit of Kobe beef! Burp.'
```

Keep in mind that since we're returning a function as a value, there's no need to use the returned function's name as
the same name for our variable. Meaning, this would work too:

```js
const whatsInHisTummy = fatBastard('Mini-Me');
whatsInHisTummy(); // prints 'The wee man is in my belly!'
```

## Gotchas

The environment of a closure is remembered and not discarded. That means that the variables in that scope are shared
(just like regular variables), and can also be changed. This is something you need to be aware of. To illustrate, let's
expand on what Fat Bastard can do with his meal, by allowing him to digest it:

```js
function fatBastard(meal) {
  function whatsForDinner() {
    if (!meal) {
      console.log('My belly is empty. Woe is me.');
    } else if (meal === 'Mini-Me') {
      console.log('The wee man is in my belly!');
    } else {
      console.log(`I'm eatin' a bit of ${meal}! Burp.`);
    }
  }

  function digest() {
    meal = undefined;
  }

  return {
    whatsForDinner,
    digest
  };
}
```

Keep in mind that we're now returning **an object** with references to our `whatsForDinner()` and `digest()` functions,
meaning that now we **do** need to use the key names to refer to them! Let's serve him another slab of beef, and give him
some time to digest it:

```js
const { whatsForDinner, digest } = fatBastard('ribeye');
whatsForDinner(); // prints 'I'm eatin' a bit of ribeye! Burp.'
digest();
whatsForDinner(); // prints 'My belly is empty. Woe is me.'
```

Another thing to watch out for is that closures are the most common source of performance issues and memory leaks. Since
the variables that are closed over might still be in use, they're either never or barely picked up by the garbage
collection.

**Note:** Garbage collection (GC) is basically something that happens in the background to automatically manage the
memory used by our application. Stuff that's no longer being used by the program takes up unnecessary memory, and the GC
is responsible for cleaning it up.

Garbage collection is something that you generally don't have to worry about, unless you're writing UI code that gets
executed a lot (e.g. the people working on Angular, React, ... do keep an eye on performance).


## Pirates and passwords

![What's the password?](https://socialmediamarketingforstudents.files.wordpress.com/2014/03/7box8.gif)

Modularization and abstracting away implementation details is key to writing good, clean code. For example, imagine
you're in a back alley. There's a door on the left, with a shady looking character looking out the peephole. As you look
at him, he yells out in a raspy voice. "Wot's the password?". _He_ knows the password, but there's no way for us to obtain
that information from him. He's certainly not going to tell us. Let's represent our new friend in code:

```js
function raspyDoorGuy() {
  const password = 'yarr';

  function givePassword(givenPassword) {
    if (givenPassword === password) {
      console.log('Ye may enter.');
    } else {
      console.log('Begone, landlubber!');
    }
  }

  return {
    givePassword
  };
}
```

Let's try to access the `password` variable:

```js
console.log(password); // prints `undefined`
```

Dang it. Well, it was worth a try. It makes sense though, since `password` is enclosed within the `raspyDoorGuy()` function,
but it's not returning it. There's no way for us to know what the right password is. Let's try to give him a password,
since that's something that our `raspyDoorGuy()` function *does* return:

```js
const { givePassword } = raspyDoorGuy();
givePassword('kittens'); // prints 'Begone, landlubber!'
```

The `givePassword()` function can still access the `password` variable defined in its parent function scope, since the
`raspyDoorGuy()` function is a closure. This is how he can check if the password we gave is the right one. Unfortunately
for us, we still don't know the right password. What if we could bribe him? That would help us out. Since everyone has
a set of internal moral beliefs, we can abstract away that functionality. All we care about is if he thinks our bribe
is enough.

```js
function raspyDoorGuy() {
  const password = 'yarr';

  function givePassword(givenPassword) {
    if (givenPassword === password) {
      console.log('Ye may enter.');
    } else {
      console.log('Begone, landlubber!');
    }
  }

  function willBreakPrinciples(bribeAmount) {
    return bribeAmount >= 50;
  }

  function bribe(amount) {
    if (willBreakPrinciples(amount)) {
      return password;
    } else {
      console.log("Pssht. That won't work.");
    }
  }

  return {
    givePassword,
    bribe
  };
}
```

If we take a look at the code above, we see that there are now *three* functions, but we only return two. This means
that the `willBreakPrinciples()` function is *private* — it can only be accessed in the closure. This sort of emulates
private methods you see in other programming languages. There's no way for us to know how much a good bribe would be,
but if we give him enough money, we'll get the password:

```
const { bribe } = raspyDoorGuy();
bribe(80); // returns 'yarr'
```

And now we're in! That's about it for closures. It's important to know how they work and why they're useful, as well as
their implications.

![Rachel on closures](https://media.giphy.com/media/jz0oM9Els8bHa/giphy.gif)

## Resources

- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Closures](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/#one-codescopecode-value-for-them-all)
