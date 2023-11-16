import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const initDB = await openDB('jate', 1)
  const tx = initDB.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate')
  const request = store.put({ id: 1, value: content})
  const result = await request
  console.log('Content added to database...', result.value)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDB = await openDB('jate', 1)
  const tx = contactDB.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')
  const request = store.get(1)
  const result = await request
  console.log('result.value', result)
  return result?.value
}

initdb();