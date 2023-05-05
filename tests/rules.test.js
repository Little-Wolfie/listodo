import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import { getFirestore } from "firebase/firestore";
const firebase = require("@firebase/testing");
const fs = require("fs");

const rulesContent = fs.readFileSync("firestore.rules", "utf8");

async function loadRules() {
  await firebase.loadFirestoreRules({
    projectId: myProjectID,
    rules: rulesContent,
  });
  rulesTestEnv = await initializeTestEnvironment({
    projectId: myProjectID,
    firestore: {
      rules: rulesContent,
      host: "127.0.0.1",
      port: 4051,
    },
  });
}
const myProjectID = "listodo-f5e57";

let rulesTestEnv;

function getAuthedFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: myProjectID, auth: auth })
    .firestore();
}

// ...

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId: myProjectID });
});

beforeAll(async () => {
  // Corrected from 'before' to 'beforeAll'
  // Load the rules file before the tests begin
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await loadRules();
});

// ...

describe("my rules", () => {
  test("users can only post a new task when they're logged in", async () => {
    const db = getAuthedFirestore({ uid: "alice" });
    await assertSucceeds(db.collection("tasks").doc("alice"));
  });

  test("a user must be logged in to view their tasks", async () => {
    const db = getAuthedFirestore();
    const testDoc = db.collection("tasks").doc("N4Kdmya0FOKQAOrocfVn");
    await firebase.assertFails(testDoc.get());
  });

  const db = getAuthedFirestore({ uid: "alice" });

  test("users can read and write tasks", async () => {
    const aliceDoc = db.collection("tasks").doc("alice");
    await assertSucceeds(aliceDoc.set({ someData: true }));
  });

  test("users can only read and write tasks that belong to them", async () => {
    const aliceDoc = db.collection("tasks").doc("alice");
    await aliceDoc.set({ someData: true, owner: "alice" });
    const jackDoc = db.collection("tasks").doc("jack");
    await assertFails(jackDoc.get());
  });

  test("users can only edit tasks that belong to them", async () => {
    const aliceDoc = db.collection("tasks").doc("alice");
    await aliceDoc.set({ someData: true, owner: "alice" });
    const jackDoc = db.collection("tasks").doc("jack");
    await assertSucceeds(aliceDoc.set({ someData: true }));
  });

  test("users can't edit other people's tasks", async () => {
    const aliceDoc = db.collection("tasks").doc("alice");
    await aliceDoc.set({ someData: true, owner: "alice" });
    const jackDoc = db.collection("tasks").doc("jack");
    await assertFails(jackDoc.set({ someData: true }));
  });

  test("users can't post tasks to other people's tasklist", async () => {
    const aliceDoc = db.collection("tasks").doc("alice");
    await aliceDoc.set({ someData: true, owner: "alice" });
    const jackDoc = db.collection("tasks").doc("jack");
    await assertFails(jackDoc.update({ someData: true }));
  });
  
  test("users can delete their own tasks", async () => {
    const taskRef = db.collection("tasks").doc("alice")
    await taskRef.set({
      task1: "feed the dog",
      task2: "take out the trash",
      task3: "laundry",
      owner: "alice",
    });
    await taskRef.delete();
    const docSnapshot = await taskRef.get()
    expect(docSnapshot.exists).toBe(false);
  });

  test("users can't delete other people's tasks", async () => {
    const jackDoc = db.collection("tasks").doc("jack");
    const taskRef = db.collection("tasks").doc("alice")
    await taskRef.set({
      task1: "feed the dog",
      task2: "take out the trash",
      task3: "laundry",
      owner: "alice",
    });

    await assertFails(jackDoc.delete())
  });
  
  afterAll(async () => {
    await rulesTestEnv?.cleanup();
  });
});
