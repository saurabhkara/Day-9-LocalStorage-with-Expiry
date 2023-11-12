window.localStorageWithExpry = {
  setItem: function (key, value, time) {
    let result = {
      value,
      expiryTime: Date.now() + time,
    };
    localStorage.setItem(key, JSON.stringify(result));
  },
  getItem: function (key) {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    if (data.expiryTime <= Date.now()) {
      this.removeItem(key);
      return null;
    }
    return data.value;
  },
  removeItem: function (key) {
    localStorage.removeItem(key);
  },
};

localStorageWithExpry.setItem("name", "Saurabh", 2000);
console.log(localStorageWithExpry.getItem("name"));
setTimeout(() => {
  console.log(localStorageWithExpry.getItem("name"));
}, 4000);
