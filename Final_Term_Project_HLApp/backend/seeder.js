const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust path if necessary

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected for Seeding..."))
  .catch(err => console.error("Connection Error:", err));

// Bcrypt hash for "password123"
const defaultPassword = "$2a$10$g8HOlMwDeVAjYbDj/eKD7.5ePLcMJbW9WQxDhvL069jXsbg/WnF8q";

const seedUsers = [
  // ==================== 15 DOCTORS (With Hardcoded IDs for Frontend) ====================
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c001"), name: "Dr. Tariq Mahmood (Cardiologist)", email: "tariq@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c002"), name: "Dr. Aisha Khan (Dermatologist)", email: "aisha@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c003"), name: "Dr. Bilal Ahmed (Pediatrician)", email: "bilal@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c004"), name: "Dr. Sana Sheikh (Neurologist)", email: "sana@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c005"), name: "Dr. Usman Ali (Orthopedic Surgeon)", email: "usman@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c006"), name: "Dr. Fatima Raza (Gynecologist)", email: "fatima@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c007"), name: "Dr. Imran Qureshi (Psychiatrist)", email: "imran@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c008"), name: "Dr. Nida Shah (Ophthalmologist)", email: "nida@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c009"), name: "Dr. Zainab Malik (ENT Specialist)", email: "zainab@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c010"), name: "Dr. Fahad Mustafa (Gastroenterologist)", email: "fahad@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c011"), name: "Dr. Hira Tareen (Endocrinologist)", email: "hira@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c012"), name: "Dr. Kamran Akmal (Urologist)", email: "kamran@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c013"), name: "Dr. Sadia Imam (Oncologist)", email: "sadia@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c014"), name: "Dr. Asad Umar (Pulmonologist)", email: "asad@hlapp.com", password: defaultPassword, role: "doctor" },
  { _id: new mongoose.Types.ObjectId("65f1a2b3c4d5e6f7a8b9c015"), name: "Dr. Maryam Tariq (General Physician)", email: "maryam@hlapp.com", password: defaultPassword, role: "doctor" },

  // ==================== 15 PATIENTS ====================
  { name: "Ali Hassan", email: "ali@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Zainab Abbas", email: "zainab.p@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Omar Farooq", email: "omar@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Rabia Basri", email: "rabia@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Hamza Ali", email: "hamza@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Iqra Aziz", email: "iqra@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Saad Baig", email: "saad@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Hina Rabbani", email: "hina@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Ahsan Khan", email: "ahsan@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Mahira Khan", email: "mahira@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Fawad Afzal", email: "fawad@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Sajal Ali", email: "sajal@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Noman Ijaz", email: "noman@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Mehwish Hayat", email: "mehwish@hlapp.com", password: defaultPassword, role: "patient" },
  { name: "Atif Aslam", email: "atif@hlapp.com", password: defaultPassword, role: "patient" }
];

const importData = async () => {
    try {
        await User.deleteMany(); // Wipes old data to prevent duplicates
        await User.insertMany(seedUsers);
        console.log('Successfully Seeded 15 Doctors and 15 Patients!');
        process.exit();
    } catch (error) {
        console.error('Error seeding records:', error);
        process.exit(1);
    }
};

importData();