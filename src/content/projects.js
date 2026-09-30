import matteChat from '../assets/matte/Chat.png';
import matteRag from '../assets/matte/Rag.png';
import matteAgentCreation from '../assets/matte/Agent Creation.png';
import matteAgentChat from '../assets/matte/Agent Chat.png';
import matteFlow from '../assets/matte/LangFlow.png';
import matteApiKeys from '../assets/matte/Api Keys.png';
import matteCreateAccount from '../assets/matte/Create Account.png';
import matteEmailSignIn from '../assets/matte/Email only sign in.png';
import hospitalMain from '../assets/main-page.png';
import hospitalLogin from '../assets/login.png';
import hospitalAccount from '../assets/create-account.png';
import hospitalBooking from '../assets/patient-booking.png';
import hospitalHistory from '../assets/patient-history.png';
import hospitalDoctor from '../assets/doctor-dashboard.png';
import hospitalPrescription from '../assets/doctor-prescription.png';
import hospitalAdmin from '../assets/admin-dashboard.png';
import financeTransactions from '../assets/finance-transactions.png';
import financeReports from '../assets/finance-reports.png';
import financeBudgets from '../assets/finance-budgets.png';
import financeSettings from '../assets/finance-settings.png';
import financeLogin from '../assets/finance-login.png';
import financeMenu from '../assets/finance-menu.png';
import bookLogin from '../assets/book-login.jpg';
import bookAccount from '../assets/book-create-account.jpg';
import bookHome from '../assets/book-home.jpg';
import bookEdit from '../assets/book-add-edit.jpg';
import bmiHome from '../assets/bmi-home.jpg';
import bmiHistory from '../assets/bmi-history.jpg';
import cv from '../assets/Anas_Alhatti_CV_EN.pdf';

const screenshots = (images) => images.map(([src, width, height], captionIndex) => ({
  src, thumbnail: src, srcSet: undefined, width, height, captionIndex,
}));

export const profile = {
  name: 'Anas Alhatti',
  email: 'anasalhati@gmail.com',
  github: 'https://github.com/AnasAlhatti',
  cv,
};

export const projects = [
  {
    id: 'matte', category: 'featured',
    tags: ['Next.js', 'React', 'Python', 'FastAPI', 'MySQL', 'Langflow', 'TypeScript'],
    github: 'https://github.com/AnasAlhatti/Matte', demo: 'https://matte-ai.vercel.app',
    screenshots: screenshots([
      [matteChat, 1910, 945], [matteRag, 1908, 940], [matteAgentCreation, 1897, 947],
      [matteAgentChat, 1898, 936], [matteFlow, 1911, 938], [matteApiKeys, 627, 945],
      [matteCreateAccount, 472, 837], [matteEmailSignIn, 497, 570],
    ]),
  },
  {
    id: 'hospital', category: 'featured',
    tags: ['React', 'Spring Boot', 'Spring Security', 'Thymeleaf', 'MySQL', 'AWS EC2'],
    github: 'https://github.com/AnasAlhatti/Smart-Hospital-Appointment-System', demo: null,
    screenshots: screenshots([
      [hospitalMain, 1893, 718], [hospitalLogin, 617, 537], [hospitalAccount, 775, 661],
      [hospitalBooking, 1886, 880], [hospitalHistory, 1911, 881], [hospitalDoctor, 1908, 685],
      [hospitalPrescription, 660, 552], [hospitalAdmin, 1892, 882],
    ]),
  },
  {
    id: 'finance', category: 'android',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Room', 'DataStore', 'Hilt', 'Coroutines', 'Flow'],
    github: 'https://github.com/AnasAlhatti/Financeapp', demo: null,
    screenshots: screenshots([
      [financeTransactions, 1054, 2048], [financeReports, 1045, 2048], [financeBudgets, 1050, 2048],
      [financeSettings, 1066, 2048], [financeLogin, 954, 2048], [financeMenu, 1050, 2048],
    ]),
  },
  {
    id: 'book', category: 'android',
    tags: ['Kotlin', 'MVVM', 'Room', 'Firebase Auth', 'Firestore', 'Coroutines', 'Flow', 'Material UI', 'DataStore'],
    github: 'https://github.com/AnasAlhatti/Book-Manager', demo: null,
    screenshots: screenshots([
      [bookLogin, 1062, 2048], [bookAccount, 1055, 2048], [bookHome, 1043, 2048], [bookEdit, 1041, 2048],
    ]),
  },
  {
    id: 'bmi', category: 'android',
    tags: ['Kotlin', 'Jetpack Compose', 'State', 'Android Studio'],
    github: 'https://github.com/AnasAlhatti/BMI-Calculator', demo: null,
    screenshots: screenshots([[bmiHome, 955, 1808], [bmiHistory, 955, 1844]]),
  },
];
