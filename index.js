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

const { whatsForDinner, digest } = fatBastard('ribeye');
whatsForDinner(); // prints 'I'm eatin' a bit of ribeye! Burp.'
digest();
whatsForDinner(); // prints 'My belly is empty. Woe is me.'

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

const { bribe } = raspyDoorGuy();
bribe(80); // returns 'yarr'
console.log(bribe(80));
