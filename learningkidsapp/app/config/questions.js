import { ref, onValue } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig'; // Ensure you import your Firebase configuration

export const getQuestions = (callback) => {
  const parentId = auth.currentUser?.uid; // Get the current user's ID
  const childId = 'EmergencyContacts'; // Replace with actual child ID logic

  if (!parentId || !childId) {
    callback(['Error: Parent or Child ID missing.']);
    return;
  }

  const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);

  onValue(contactsRef, (snapshot) => {
    const data = snapshot.val();
    const questions = [];

    if (data) {
      // Loop through the contacts to generate questions
      Object.keys(data).forEach((key) => {
        const contact = data[key];
        const question = `What is ${contact.relationship}'s ${contact.name}'s phone number?`;
        questions.push(question);
      });

      // Pass the generated questions back to the callback
      callback(questions);
    } else {
      callback(['No emergency contacts found.']);
    }
  }, (error) => {
    console.error("Error fetching contacts:", error);
    callback(['Error fetching contacts.']);
  });
};


  
/*export const Questions = [

{
    question: "What is your zip code?",
    options: [
        "Wrong",
        "Correct",
        "Wrong",
    ],
    correctAnswer: "Correct",
},
{
    question: "What is (TITLE's) first name?",
    options: [
        "Correct",
        "Wrong",
        "Wrong",
    ],
    correctAnswer: "Correct",
},
{
    question: "What is your last name?",
    options: [
        "Wrong",
        "Correct",
        "Wrong",
    ],
    correctAnswer: "Correct",
},
{
    question: "What state do you live in?",
    options: [
        "Wrong",
        "Wrong",
        "Correct",
    ],
    correctAnswer: "Correct",
},
{
    question: "What city do you live in?",
    options: [
        "Wrong",
        "Correct",
        "Wrong",
    ],
    correctAnswer: "Correct",
},
{
    question: "What is your house number?",
    options: [
        "Correct",
        "Wrong",
        "Wrong",
    ],
    correctAnswer: "Correct",
},
{
    question: "Who can you call when you're lost?",
    options: [
        "Wrong",
        "Wrong",
        "Correct",
    ],
    correctAnswer: "Correct",
},
{
    question: "What are the last 4 numbers of your phone number?",
    options: [
        "Wrong",
        "Wrong",
        "Correct",
    ],
    correctAnswer: "Correct",
},




];*/