/* 

This is to modifi indexed db data

How to use: 

paste the below code in dev console
- then call
  updateRecord({ retries:0 })

- Note: chage STORE_NAME, ID & VERSION as needed

Future Goal: Implement Devtools

*/

const DB_NAME = "madhuram";
let STORE_NAME = "backgroundTasks";
let ID = "50c5c65b.mp3";
let VERSION = 50; // see from dev tools ( DB version )

function updateRecord(updatedData) {
  const request = indexedDB.open(DB_NAME, VERSION);

  request.onerror = () => {
    console.error("DB open failed");
  };

  request.onsuccess = () => {
    const db = request.result;

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Get existing record
    const getReq = store.get(ID);

    getReq.onsuccess = () => {
      const data = getReq.result;

      if (!data) {
        console.log("Record not found");
        return;
      }

      // Update fields
      const updatedRecord = {
        ...data,
        ...updatedData, // overwrite fields
      };

      // Save back
      store.put(updatedRecord);
    };

    tx.oncomplete = () => {
      console.log("✅ Record updated");
      db.close();
    };

    tx.onerror = () => {
      console.error("❌ Update failed");
    };
  };
}
