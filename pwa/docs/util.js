/* 

This is to modifi indexed db data

How to use: 

paste the below code in dev console
- then call
  updateRecord("backgroundTasks","060ea377.mp3",{ retries:0, status:"PENDING" })

- Note: chage STORE_NAME,VERSION as needed

Future Goal: Implement Devtools

*/

var DB_NAME = "madhuram";
var VERSION = 50; // see from dev tools ( DB version )

function updateRecord(COLLECTION_NAME, ID, updatedData) {
  const request = indexedDB.open(DB_NAME, VERSION);

  request.onerror = () => {
    console.error("DB open failed");
  };

  request.onsuccess = () => {
    const db = request.result;

    const tx = db.transaction(COLLECTION_NAME, "readwrite");
    const store = tx.objectStore(COLLECTION_NAME);

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


/* 
updateRecord("backgroundTasks","060ea377.mp3",{ retries:0, status:"PENDING" })



*/