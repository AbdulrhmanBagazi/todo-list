# todo-list
React Native - Firebase

clone repo

npm i 

make account at https://firebase.google.com/

go to Console:

1- add project (any name you like)

2- in Authentication (SIGN-IN METHOD) Enabled  Google

3- Database (Try Firestore beta)

4- Database rules:
// Anyone can read or write to the database, even non-users of your app.
service cloud.firestore {
  match /databases/{database}/documents {
    // Match all documents, recursively, with a wildcard and the "=**" recursive modifier
    match /{document=**} {
      allow read, write;
    }
  }
}

note: this is for testing

5- go to Project Settings (ADD APP) to create the google-services.json

6- add the google-services.json to android/app/google-services.json


