function initDb() {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  // Open (or create) the database
  const open = indexedDB.open('MyDatabase', 1);

  // Create the schema
  open.onupgradeneeded = function() {
    const db = open.result;
    const store = db.createObjectStore('MyObjectStore', { keyPath: 'id' });
    const index = store.createIndex('NameIndex', ['name.last', 'name.first']);
  };

  open.onsuccess = function() {
    // Start a new transaction
    const db = open.result;
    const tx = db.transaction('MyObjectStore', 'readwrite');
    const store = tx.objectStore('MyObjectStore');
    const index = store.index('NameIndex');

    // Add some data
    store.put({ id: 12345, name: { first: 'John', last: 'Doe' }, age: 42 });

    // Query the data
    const getJohn = store.get(12345);

    getJohn.onsuccess = function() {
      console.log(getJohn.result.name.first); // => "John"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
      db.close();
    };
  };
}

function outputDbValues() {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  // Open (or create) the database
  const open = indexedDB.open('MyDatabase', 1);

  console.log('outputting DB values...');
  open.onsuccess = function() {
    // Start a new transaction
    const db = open.result;
    const tx = db.transaction('MyObjectStore', 'readwrite');
    const store = tx.objectStore('MyObjectStore');
    const index = store.index('NameIndex');

    // Query the data
    const getJohn = store.get(12345);

    getJohn.onsuccess = function() {
      console.log('getJohn result', getJohn.result); // => "John"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
      db.close();
    };
  };
}

describe('sets indexeddb values', () => {
  it('inits indexeddb values', () => {
    initDb();
  });

  it('reads indexeddb values', () => {
    console.log('reads indexeddb values...');
    outputDbValues();
  });
});

describe('reads indexeddb values from different block', () => {
  it('reads indexeddb values', () => {
    console.log('reads indexeddb values...');
    outputDbValues();
  });
});
