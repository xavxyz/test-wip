export default class Balance {
  constructor() {
    this.value = 0;
  }

  get() {
    return this.value;
  }

  update({ set, diff }) {
    if (set && diff) {
      throw new Error(
        'You cannot set the balance and make a diff on its current value at the same time!'
      );
    }

    // set a new value
    if (set) {
      this.value = set;
    }

    // make a diff on the current value
    if (diff) {
      this.value = this.get() + diff;
    }

    // the update operation doesn't return anything
    return null;
  }
}

// const MongoCollection = function() {
//   let value = 0;

//   const get = () => value;
//   const set = newValue => (value = newValue);

//   return {
//     get,
//     set,
//   };
// };
