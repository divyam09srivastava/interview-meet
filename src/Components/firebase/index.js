import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
    apiKey: "AIzaSyAkxdjF-az6LMGH9DZdlP8eqXivnjqYh7g",
    authDomain: "interview-meet.firebaseapp.com",
    projectId: "interview-meet",
    storageBucket: "interview-meet.appspot.com",
    messagingSenderId: "447390722674",
    appId: "1:447390722674:web:6135569a22408dc28db0eb",
    measurementId: "G-C7TTL1DRBQ"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  dbreturns() {
    return this.db;
  }

//   login(email, password) {
//     return this.auth.signInWithEmailAndPassword(email, password);
//   }

//   logout() {
//     return this.auth.signOut();
//   }

//   async register(name, email, password) {
//     await this.auth.createUserWithEmailAndPassword(email, password);
//     return this.auth.currentUser.updateProfile({
//       displayName: name,
//     });
//   }

  addQuestion(
    title,
    level,
    question,
    category,
    input,
    output,
    explanation,
  ) {
    const data = {
        title,
        level,
        question,
        category,
        input,
        output,
        explanation,
    uid: new Date().getTime(),
    };

    // adding data here
    this.db
      .collection("questions")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        alert("Sucess : New Question Added");
        // window.location = "/";
      })
      .catch((error) => {
        // NotificationManager.error(error.message, "Create user failed");
        alert("Failure : New Question NOT Added" + "  " + error);
        // this.setState({ isSubmitting: false });
      });
  }

  

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

//   getCurrentUsername() {
//     return this.auth.currentUser && this.auth.currentUser.email;
//   }

  // async getCurrentUserDetail(email) {
  //   await this.db
  //     .collection("users")
  //     .where("email", "==", `${email}`)
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => doc.data());
  //       console.log(data);
  //       return data;
  //     });
  // }
}

export default new Firebase();