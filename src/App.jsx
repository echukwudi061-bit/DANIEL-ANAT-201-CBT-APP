import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  FileText,
  Lock,
  Upload,
  Trash2,
  Edit2,
  LogOut,
  X,
  Settings,
  LayoutGrid,
  Type,
  Menu,
  Award,
  BarChart3
} from 'lucide-react';

// --- UTILITY: SHUFFLE ARRAY ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- INITIAL DATA FROM ANAT 201 CSV ---
const INITIAL_QUESTIONS = [
  {
    "id": "1",
    "text": "Another word for digital annularis is called what ?",
    "optionA": "index finger",
    "optionB": "ring finger",
    "optionC": "little finger",
    "optionD": "middle finger",
    "correctAnswer": "optionB"
  },
  {
    "id": "2",
    "text": "what do we call a vertical plane that runs side to side and divides the body into anterior and posterior parts?",
    "optionA": "coronal plane",
    "optionB": "sagittal plane",
    "optionC": "midsagitial plane",
    "optionD": "oblique plane",
    "correctAnswer": "optionA"
  },
  {
    "id": "3",
    "text": "An imaginary plane that divides the body into lower and upper parts is called?",
    "optionA": "median plane",
    "optionB": "transverse plane",
    "optionC": "sagittal plane",
    "optionD": "coronal plane",
    "correctAnswer": "optionB"
  },
  {
    "id": "4",
    "text": "Another name for Gross anatomy is?",
    "optionA": "microscopic anatomy",
    "optionB": "Comparative anatomy",
    "optionC": "Embryology",
    "optionD": "Macroscopic anatomy",
    "correctAnswer": "optionD"
  },
  {
    "id": "5",
    "text": "________ is the intersection of the median plane with the anterior surface of the thorax",
    "optionA": "Midvertebral line",
    "optionB": "Anterior axillary line",
    "optionC": "midsternal line",
    "optionD": "lateral sternal line",
    "correctAnswer": "optionC"
  },
  {
    "id": "6",
    "text": "Another word for digital minimus is called what?",
    "optionA": "little finger",
    "optionB": "middle finger",
    "optionC": "index finger",
    "optionD": "thumb",
    "correctAnswer": "optionA"
  },
  {
    "id": "7",
    "text": "which one of the muscles does not exert force on the upper limb?",
    "optionA": "Pectoral major",
    "optionB": "Latissimus dorsi",
    "optionC": "Serratus anterior",
    "optionD": "subclavius",
    "correctAnswer": "optionB"
  },
  {
    "id": "8",
    "text": "which of the following is the insertion of the pectoris minor?",
    "optionA": "Acromion of the scapula",
    "optionB": "Coracoid process of the scapula",
    "optionC": "Medial border of the scapula",
    "optionD": "tubercle of the humerus",
    "correctAnswer": "optionB"
  },
  {
    "id": "9",
    "text": "which of the following is not true about the axilla?",
    "optionA": "The axilla lies underneath the shoulder joint",
    "optionB": "The Axilla has six borders or sides",
    "optionC": "The anterior base is formed by skin and fascia",
    "optionD": "The axilla is a flat, two-sided space beneath the arm",
    "correctAnswer": "optionD"
  },
  {
    "id": "10",
    "text": "which of the following is the glandular tissue of the adult female breast?",
    "optionA": "The stroma",
    "optionB": "The Areola",
    "optionC": "The Adipose tissue",
    "optionD": "The parenchyma",
    "correctAnswer": "optionD"
  },
  {
    "id": "11",
    "text": "in which quadrant of the breast is the axillary process located?",
    "optionA": "superior lateral",
    "optionB": "superior medial",
    "optionC": "inferior lateral",
    "optionD": "inferior medial",
    "correctAnswer": "optionA"
  },
  {
    "id": "12",
    "text": "which of the following is the breasts main bulk?",
    "optionA": "stroma",
    "optionB": "glandular tissue",
    "optionC": "Lobules",
    "optionD": "suspensory ligaments",
    "correctAnswer": "optionA"
  },
  {
    "id": "13",
    "text": "which of the following is not among the arterial supply to the adult female breast?",
    "optionA": "Axillary artery branches",
    "optionB": "inter-coastal artery",
    "optionC": "Internal coastal artery",
    "optionD": "External illac artery",
    "correctAnswer": "optionD"
  },
  {
    "id": "14",
    "text": "which of the following largely controls the secretory activities of the gland of the breast?",
    "optionA": "oxytocin hormone",
    "optionB": "efferent motor fibers",
    "optionC": "ovarian hormones",
    "optionD": "Afferent motor fibers",
    "correctAnswer": "optionC"
  },
  {
    "id": "15",
    "text": "_______ is a network of nerves",
    "optionA": "Branchial plexus",
    "optionB": "nerves plexus",
    "optionC": "Vascular plexus",
    "optionD": "lymph plexus",
    "correctAnswer": "optionB"
  },
  {
    "id": "16",
    "text": "which of the following is not part of the branchial plexus?",
    "optionA": "Roots",
    "optionB": "segments",
    "optionC": "Trunks",
    "optionD": "Division",
    "correctAnswer": "optionB"
  },
  {
    "id": "17",
    "text": "which of the following form the roots of the spinal nerves",
    "optionA": "C5 to T1",
    "optionB": "C4 to T1",
    "optionC": "C1 to T5",
    "optionD": "C2 to C7",
    "correctAnswer": "optionA"
  },
  {
    "id": "18",
    "text": "which part of the branchial plexus is found deep/below to the clavicle",
    "optionA": "Roots",
    "optionB": "Cords",
    "optionC": "Trunks",
    "optionD": "Divisions",
    "correctAnswer": "optionD"
  },
  {
    "id": "19",
    "text": "which part of the branchial plexus are made up of 6 parts?",
    "optionA": "Root",
    "optionB": "cord",
    "optionC": "Division",
    "optionD": "trunk",
    "correctAnswer": "optionC"
  },
  {
    "id": "20",
    "text": "Which of the following is not one of the five terminal branches of the brachial plexus?",
    "optionA": "Facial nerve",
    "optionB": "Median nerve",
    "optionC": "Radial nerve",
    "optionD": "Axillary nerve",
    "correctAnswer": "optionA"
  },
  {
    "id": "21",
    "text": "what ligament prevents the clavicle from moving too far upwards?",
    "optionA": "Acromioclavicular ligament",
    "optionB": "Conoid ligaments",
    "optionC": "Trapezoid ligament",
    "optionD": "glenohumeral ligament",
    "correctAnswer": "optionB"
  },
  {
    "id": "22",
    "text": "one of the following is not part of the rotator cuff muscles",
    "optionA": "Teres minor",
    "optionB": "Subscapularis",
    "optionC": "supraspinatus",
    "optionD": "Teres major",
    "correctAnswer": "optionD"
  },
  {
    "id": "23",
    "text": "which of the following is not an anatomical space in the shoulder",
    "optionA": "Triangular space",
    "optionB": "Quadrangular space",
    "optionC": "submental space",
    "optionD": "Triangular interval",
    "correctAnswer": "optionC"
  },
  {
    "id": "24",
    "text": "One of the following is not a subclass of Fibrous joint",
    "optionA": "synchondroses",
    "optionB": "sutures",
    "optionC": "syndesmores",
    "optionD": "Gomphoses",
    "correctAnswer": "optionA"
  },
  {
    "id": "25",
    "text": "which of the following is not part of the class of synovial joints by articular surfaces?",
    "optionA": "Ellipsoid joints",
    "optionB": "multiaxial joints",
    "optionC": "Saddle joints",
    "optionD": "Ball and socket joints",
    "correctAnswer": "optionB"
  },
  {
    "id": "26",
    "text": "Which of the following is the innervation of the Deltoid muscles?",
    "optionA": "Suprascapular nerve",
    "optionB": "Lower subscapular nerve",
    "optionC": "Axillary nerve",
    "optionD": "upper Subscapular nerve",
    "correctAnswer": "optionC"
  },
  {
    "id": "27",
    "text": "Which one of the following is not a nerve supply to the shoulder's joint?",
    "optionA": "Axillary nerve",
    "optionB": "Radial nerve",
    "optionC": "lateral pectoral nerve",
    "optionD": "Suprascapular nerve",
    "correctAnswer": "optionB"
  },
  {
    "id": "28",
    "text": "which of the following helps reduce Friction and cushion pressure between bones, tendons, muscles, and skin near joints?",
    "optionA": "Ligaments",
    "optionB": "Tendons sheath",
    "optionC": "Bursa",
    "optionD": "Articular cartilage",
    "correctAnswer": "optionC"
  },
  {
    "id": "29",
    "text": "Which of the following is not part of the anterior compartment of the arm?",
    "optionA": "Biceps brachii",
    "optionB": "Coracobrachialis",
    "optionC": "Flexors of arm and elbow",
    "optionD": "Triceps brachii",
    "correctAnswer": "optionD"
  },
  {
    "id": "30",
    "text": "Which of the following is the innervation of the brachialis muscle?",
    "optionA": "Musculocutaneous nerve",
    "optionB": "Lateral root of median nerve",
    "optionC": "Lateral pectoral nerve",
    "optionD": "Radial nerve",
    "correctAnswer": "optionA"
  },
  {
    "id": "31",
    "text": "What is the place of growth of the bone during development?",
    "optionA": "Epiphysis",
    "optionB": "Metaphysis",
    "optionC": "Diaphysis",
    "optionD": "Periosteum",
    "correctAnswer": "optionB"
  },
  {
    "id": "32",
    "text": "What is the primary site of hematopoiesis?",
    "optionA": "Liver",
    "optionB": "Spleen",
    "optionC": "Thymus",
    "optionD": "Red bone marrow",
    "correctAnswer": "optionD"
  },
  {
    "id": "33",
    "text": "Which of the following is not an irregular bone ?",
    "optionA": "The Vertebrae",
    "optionB": "The scaphoid bone",
    "optionC": "The ischium",
    "optionD": "The ilium",
    "correctAnswer": "optionB"
  },
  {
    "id": "34",
    "text": "Which of the following is not an artery of the forearm?",
    "optionA": "Radial artery",
    "optionB": "Ulnar artery",
    "optionC": "Axillary artery",
    "optionD": "Anterior interosseous artery",
    "correctAnswer": "optionC"
  },
  {
    "id": "35",
    "text": "Which of the following is not among the superficial muscles of the forearm?",
    "optionA": "Pronator teres",
    "optionB": "Flexor carpi radialis",
    "optionC": "palmaris longus",
    "optionD": "Flexor digitorum profundus",
    "correctAnswer": "optionD"
  },
  {
    "id": "36",
    "text": "_______ is the continuation of the posterior cord of the brachial plexus",
    "optionA": "The radial nerve",
    "optionB": "The Ulnar nerve",
    "optionC": "The axillary nerve",
    "optionD": "The median nerve",
    "correctAnswer": "optionA"
  },
  {
    "id": "37",
    "text": "which of the following is the largest branch of the brachial plexus?",
    "optionA": "Musculocutaneous nerve",
    "optionB": "The radial nerve",
    "optionC": "Median nerve",
    "optionD": "Axillary nerve",
    "correctAnswer": "optionB"
  },
  {
    "id": "38",
    "text": "________ is formed by the unification of the medial and Lateral cords of the brachial plexus",
    "optionA": "The Ulnar nerve",
    "optionB": "The Median nerve",
    "optionC": "The Radial nerve",
    "optionD": "The Auxiliary nerve",
    "correctAnswer": "optionB"
  },
  {
    "id": "39",
    "text": "which type of bones develop via Endochondral ossification?",
    "optionA": "The long bones",
    "optionB": "The Flat bones",
    "optionC": "The short bones",
    "optionD": "The irregular bones",
    "correctAnswer": "optionA"
  },
  {
    "id": "40",
    "text": "What are the last bones in the hand called?",
    "optionA": "proximal phalanges",
    "optionB": "metacarpals",
    "optionC": "carpals",
    "optionD": "distal phalanges",
    "correctAnswer": "optionD"
  },
  {
    "id": "41",
    "text": "what is the origin of the Abductor Digiti Minimi muscle",
    "optionA": "Hamate bone",
    "optionB": "pisiform bone",
    "optionC": "Lunate bone",
    "optionD": "Triquetrum bone",
    "correctAnswer": "optionB"
  },
  {
    "id": "42",
    "text": "what causes carpel tunnel syndrome?",
    "optionA": "Compression of the median nerve in the carpal tunnel",
    "optionB": "Compression of the ulnar nerve at the elbow",
    "optionC": "Inflammation of the radial artery",
    "optionD": "Fracture of the scaphoid bone",
    "correctAnswer": "optionA"
  },
  {
    "id": "43",
    "text": "which of the following statements is false?",
    "optionA": "The axis of movement of supination and pronation is not stationary",
    "optionB": "in supination, the radius and ulna lie parallel to each other ",
    "optionC": "pronation is more powerful than supination",
    "optionD": "Supination has antigravity movement",
    "correctAnswer": "optionC"
  },
  {
    "id": "44",
    "text": "which of the following is the movement of the lnferior(distal) Radio-Ulnar joint?",
    "optionA": "supination and pronation",
    "optionB": "flexion and extension",
    "optionC": "Abduction and adduction",
    "optionD": "circumduction",
    "correctAnswer": "optionA"
  },
  {
    "id": "45",
    "text": "Where does the arterial supply to the upper limb originate from?",
    "optionA": "Axillary artery",
    "optionB": "Subclavian artery",
    "optionC": "Brachial artery",
    "optionD": "Radial artery",
    "correctAnswer": "optionB"
  },
  {
    "id": "46",
    "text": "what does Allen's test assess?",
    "optionA": "integrity of the median nerve",
    "optionB": "Blood flow through the radial and ulnar arteries",
    "optionC": "Flexor tendon function",
    "optionD": "Lymphatic drainage of the upper limb",
    "correctAnswer": "optionB"
  },
  {
    "id": "47",
    "text": "where can the majority of the upper extremity lymph nodes be found?",
    "optionA": "Axilla",
    "optionB": "Cubital fossa",
    "optionC": "Deltoid region",
    "optionD": "Brachial plexus",
    "correctAnswer": "optionA"
  },
  {
    "id": "48",
    "text": "where does the 5 groups of Axillary lymphatic nodes drain into?",
    "optionA": "Cervical nodes",
    "optionB": "The apical nodes",
    "optionC": "Subclavian vein",
    "optionD": "Brachial plexus",
    "correctAnswer": "optionB"
  },
  {
    "id": "49",
    "text": "Which of the following are divisions of the veins of the hand?",
    "optionA": "Radial and ulnar venous systems",
    "optionB": "Palmar and dorsal arterial systems",
    "optionC": "Digital and metacarpal nerve systems",
    "optionD": "Superficial and Deep venous system",
    "correctAnswer": "optionD"
  },
  {
    "id": "50",
    "text": "_______ is a common site for the transfusion and sampling of blood",
    "optionA": "Axilla",
    "optionB": "Cubital fossa",
    "optionC": "Carpal tunnel",
    "optionD": "Deltoid region",
    "correctAnswer": "optionB"
  }
];

export default function App() {
  // --- STATE WITH LOCAL STORAGE PERSISTENCE ---
  const [view, setView] = useState('welcome');
  
  // 1. Guest ID Generation (NEW)
  const [guestId, setGuestId] = useState(() => {
    const saved = localStorage.getItem('cbt_guestId');
    if (saved) return saved;
    // Generate new Guest ID
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const newId = `GUEST ID: ${randomNum}`;
    localStorage.setItem('cbt_guestId', newId);
    return newId;
  });

  // 2. Questions - Init with Shuffled Questions
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('cbt_questions');
    return saved ? JSON.parse(saved) : shuffleArray(INITIAL_QUESTIONS);
  });

  // 3. App Name
  const [appName, setAppName] = useState(() => {
    return localStorage.getItem('cbt_appName') || "DANIEL'S ANATOMY CBT APP";
  });

  // 4. Test Title
  const [testTitle, setTestTitle] = useState(() => {
    return localStorage.getItem('cbt_testTitle') || "ANAT 201: GROSS ANATOMY I(UPPER LIMB)";
  });

  // 5. Duration
  const [testDuration, setTestDuration] = useState(() => {
    const saved = localStorage.getItem('cbt_duration');
    return saved ? parseInt(saved, 10) : 20;
  });

  // 6. Marks Per Question
  const [marksPerQuestion, setMarksPerQuestion] = useState(() => {
    const saved = localStorage.getItem('cbt_marks');
    return saved ? parseInt(saved, 10) : 2;
  });

  // 7. Student Results
  const [testResults, setTestResults] = useState(() => {
    const saved = localStorage.getItem('cbt_results');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Test Taking State ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Admin State ---
  const [adminPassInput, setAdminPassInput] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const fileInputRef = useRef(null);

  // --- EFFECT: SAVE TO LOCAL STORAGE ---
  useEffect(() => { localStorage.setItem('cbt_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('cbt_appName', appName); }, [appName]);
  useEffect(() => { localStorage.setItem('cbt_testTitle', testTitle); }, [testTitle]);
  useEffect(() => { localStorage.setItem('cbt_duration', testDuration.toString()); }, [testDuration]);
  useEffect(() => { localStorage.setItem('cbt_marks', marksPerQuestion.toString()); }, [marksPerQuestion]);
  useEffect(() => { localStorage.setItem('cbt_results', JSON.stringify(testResults)); }, [testResults]);
  useEffect(() => { localStorage.setItem('cbt_guestId', guestId); }, [guestId]);

  // --- Timer Logic ---
  useEffect(() => {
    if (view === 'test' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (view === 'test' && timeLeft === 0) {
      handleSubmit(); 
    }
  }, [view, timeLeft]);

  // --- Handlers ---
  const startTest = () => {
    if (questions.length === 0) {
      alert("No questions available! Please login as admin and add some.");
      return;
    }
    setAnswers({});
    setScore(0);
    setCurrentQIndex(0);
    setTimeLeft(testDuration * 60); 
    setView('test');
    setIsMobileMenuOpen(false);
  };

  const handleAnswerSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let rawScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        rawScore += 1;
      }
    });

    const finalScore = rawScore * marksPerQuestion;
    const totalPossible = questions.length * marksPerQuestion;
    const percentage = Math.round((finalScore / totalPossible) * 100);

    // Save Result with Guest ID
    const newResult = {
      id: Date.now(),
      guestId: guestId, // Add Guest ID to result
      score: finalScore,
      total: totalPossible,
      percentage: percentage,
      date: new Date().toLocaleString()
    };

    setTestResults(prev => [newResult, ...prev]);
    setScore(finalScore);
    setView('result');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassInput === 'BrainyBlessing08148800047') {
      setView('admin');
      setAdminPassInput('');
    } else {
      alert("Incorrect Password");
    }
  };

  const handleDeleteQuestion = (id) => {
    if(window.confirm("Delete this question?")) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    setEditingQuestion(null);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const newQuestions = [];
      
      lines.forEach((line, idx) => {
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
               if (parts.length >= 6 && idx > 0) {
           const clean = (str) => str?.replace(/^"|"$/g, '').trim() || '';
           let correctKey = clean(parts[5]).toLowerCase();
           
           if (correctKey === 'a' || correctKey.includes('option a')) correctKey = 'optionA';
           else if (correctKey === 'b' || correctKey.includes('option b')) correctKey = 'optionB';
           else if (correctKey === 'c' || correctKey.includes('option c')) correctKey = 'optionC';
           else if (correctKey === 'd' || correctKey.includes('option d')) correctKey = 'optionD';
           else correctKey = 'optionA';

           newQuestions.push({
             id: Date.now() + Math.random().toString(),
             text: clean(parts[0]),
             optionA: clean(parts[1]),
             optionB: clean(parts[2]),
             optionC: clean(parts[3]),
             optionD: clean(parts[4]),
             correctAnswer: correctKey
           });
        }
      });

      if (newQuestions.length > 0) {
        setQuestions(prev => [...prev, ...newQuestions]);
        alert(`Successfully added ${newQuestions.length} questions!`);
      } else {
        alert("Could not parse questions. Check CSV format.");
      }
    };
    reader.readAsText(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // --- Reset to Default (Admin Action) ---
  const handleResetDefaults = () => {
    if(window.confirm("Reset all settings and questions to default? This clears your changes.")) {
        localStorage.clear();
        window.location.reload();
    }
  };

  const handleClearResults = () => {
    if(window.confirm("Clear all student results?")) {
      setTestResults([]);
    }
  };

  // ---------------- RENDERING ----------------

  // 1. EDIT MODAL
  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Question</h3>
          <button onClick={() => setEditingQuestion(null)}><X className="w-6 h-6"/></button>
        </div>
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Question Text</label>
            <textarea 
              className="w-full border p-2 rounded" 
              value={editingQuestion.text}
              onChange={e => setEditingQuestion({...editingQuestion, text: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['optionA', 'optionB', 'optionC', 'optionD'].map(opt => (
              <div key={opt}>
                <label className="block text-xs font-bold uppercase mb-1">{opt}</label>
                  <input 
                  className="w-full border p-2 rounded"
                  value={editingQuestion[opt]}
                  onChange={e => setEditingQuestion({...editingQuestion, [opt]: e.target.value})}
                  required
                 />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Correct Answer</label>
            <select 
              className="w-full border p-2 rounded"
              value={editingQuestion.correctAnswer}
              onChange={e => setEditingQuestion({...editingQuestion, correctAnswer: e.target.value})}
            >
              <option value="optionA">Option A</option>
              <option value="optionB">Option B</option>
              <option value="optionC">Option C</option>
              <option value="optionD">Option D</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
        </form>
      </div>
    </div>
  );

  // 2. ADMIN VIEW
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900">
        {editingQuestion && renderEditModal()}
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <h1 className="text-xl md:text-2xl font-bold flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600"/> Admin Panel
            </h1>
            <div className="flex gap-2">
                <button 
                onClick={handleResetDefaults}
                className="flex items-center text-gray-500 font-bold hover:bg-gray-200 px-3 py-2 rounded text-sm"
                >
                Reset Defaults
                </button>
                <button 
                onClick={() => setView('welcome')}
                className="flex items-center text-red-600 font-bold hover:bg-red-50 px-3 py-2 rounded"
                >
                <LogOut className="w-5 h-5 mr-2"/> Exit
                </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
              <Settings className="w-5 h-5 mr-2"/> Test Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Type className="w-4 h-4 mr-1 text-gray-400"/> App Name
                </label>
                <input 
                  type="text" 
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
                  <input 
                  type="text" 
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              {/* Duration Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400"/> Duration (Minutes)
                </label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setTestDuration(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >-</button>
                  <span className="text-xl font-mono font-bold w-12 text-center">{testDuration}</span>
                  <button 
                    onClick={() => setTestDuration(prev => prev + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >+</button>
                </div>
              </div>

              {/* Marks Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Award className="w-4 h-4 mr-1 text-gray-400"/> Marks per Question
                </label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setMarksPerQuestion(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >-</button>
                   <span className="text-xl font-mono font-bold w-12 text-center">{marksPerQuestion}</span>
                  <button 
                    onClick={() => setMarksPerQuestion(prev => prev + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >+</button>
                </div>
              </div>

            </div>
          </div>
          
          {/* Student Results Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center text-gray-800">
                  <BarChart3 className="w-5 h-5 mr-2"/> Student Results
                </h2>
                <button 
                   onClick={handleClearResults}
                   className="text-red-500 text-sm font-bold hover:underline"
                >
                   Clear History
                </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 border-b">
                   <tr>
                     <th className="p-3">Guest ID</th>
                     <th className="p-3">Score</th>
                     <th className="p-3">Percentage</th>
                     <th className="p-3 text-right">Date/Time</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {testResults.length === 0 ? (
                     <tr>
                       <td colSpan="4" className="p-4 text-center text-gray-400 italic">No results yet.</td>
                     </tr>
                   ) : (
                       testResults.map((res) => (
                       <tr key={res.id} className="hover:bg-gray-50">
                         {/* GUEST ID COLUMN */}
                         <td className="p-3">
                           <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full border border-blue-100">
                             {res.guestId || 'N/A'}
                           </span>
                         </td>
                         <td className="p-3 font-bold">{res.score} / {res.total}</td>
                         <td className={`p-3 font-bold ${res.percentage >= 40 ? 'text-green-600' : 'text-red-600'}`}>
                           {res.percentage}%
                         </td>
                         <td className="p-3 text-right text-gray-500">{res.date}</td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
               <p className="text-xs text-gray-400 mt-2 italic">* Only shows results taken on this specific device.</p>
             </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="file" 
              accept=".csv" 
              ref={fileInputRef}
              onChange={handleCSVUpload}
              className="hidden" 
            />
            <div className="flex gap-2 w-full md:w-auto">
               <button 
                onClick={() => fileInputRef.current.click()}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                <Upload className="w-5 h-5 mr-2"/> Import CSV
                </button>
                <button 
                onClick={() => { if(window.confirm("Delete ALL questions?")) setQuestions([]); }}
                className="flex-1 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-bold"
                >
                <Trash2 className="w-5 h-5 mr-2"/> Clear All
                </button>
            </div>
            <div className="md:ml-auto font-bold text-gray-500">
              Total: {questions.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-gray-50 border-b">
                  <tr>
                  <th className="p-4 w-12">#</th>
                  <th className="p-4">Question</th>
                  <th className="p-4 w-32">Answer</th>
                  <th className="p-4 w-32 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y">
                {questions.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-400">{idx + 1}</td>
                    <td className="p-4 font-medium max-w-xs truncate">{q.text}</td>
                    <td className="p-4 uppercase text-green-700 font-bold">{q.correctAnswer.replace('option','')}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setEditingQuestion(q)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded mr-2"
                      >
                        <Edit2 className="w-4 h-4"/>
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </td>
                  </tr>
                 ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
                                               }
      // 3. WELCOME SCREEN
  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-blue-100 relative">
          
          {/* GUEST ID BADGE - WELCOME SCREEN (Top Right of Card) */}
          <div className="absolute top-4 right-4">
             <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full border border-blue-100">
               {guestId}
             </span>
          </div>

          <div className="mb-6 flex justify-center mt-4">
            <div className="bg-blue-100 p-4 rounded-full">
               <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 uppercase tracking-tight">{appName}</h1>
          <p className="text-gray-500 font-medium mb-6 uppercase text-xs md:text-sm">{testTitle}</p>
          
          <div className="text-left bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-8 space-y-2">
            <p className="flex items-center"><Clock className="w-4 h-4 mr-2"/> <strong>Time Limit:</strong> {testDuration} Minutes</p>
            <p className="flex items-center"><FileText className="w-4 h-4 mr-2"/> <strong>Questions:</strong> {questions.length}</p>
            <p className="flex items-center"><CheckCircle className="w-4 h-4 mr-2"/> <strong>Scoring:</strong> {marksPerQuestion} Marks / Question</p>
          </div>

          <button 
            onClick={startTest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center mb-6"
          >
            <Play className="w-5 h-5 mr-2" /> Start Test
          </button>

          <div className="border-t pt-6">
            <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Admin Access</p>
            <form onSubmit={handleAdminLogin} className="flex gap-2">
              <input 
                type="password"
                placeholder="Password"
                value={adminPassInput}
                onChange={(e) => setAdminPassInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm font-bold hover:bg-black">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 4. TEST SCREEN
  if (view === 'test') {
    const question = questions[currentQIndex];
    return (
      <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
        {/* Header - Optimized for Mobile */}
        <header className="bg-white shadow-sm px-3 md:px-6 py-3 flex justify-between items-center z-20 flex-shrink-0 w-full relative">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-600"/>
            </button>

            <div className="flex flex-col overflow-hidden min-w-0">
               <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider truncate">
                {appName}
              </span>
              <h1 className="font-bold text-black text-xs md:text-lg uppercase truncate leading-tight">
                {testTitle}
              </h1>
              {/* GUEST ID BADGE - TEST SCREEN (Below Title) */}
              <div className="mt-1">
                 <span className="inline-block px-3 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full border border-blue-100">
                    {guestId}
                 </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className={`font-mono font-bold text-sm md:text-xl ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-blue-600'} flex items-center`}>
              <Clock className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => {
                 if(window.confirm("Are you sure you want to submit?")) handleSubmit();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold shadow-md transition text-xs md:text-base whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden relative">
            {isMobileMenuOpen && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <aside className={`
                absolute inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:shadow-none md:z-10 md:w-72
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-700 flex items-center text-sm md:text-base">
                        <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600"/> Navigator
                    </h2>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="md:hidden p-1 text-gray-500"
                    >
                      <X className="w-5 h-5"/>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, idx) => {
                            const isAnswered = !!answers[q.id];
                            const isCurrent = idx === currentQIndex;
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                      setCurrentQIndex(idx);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className={`
                                        h-8 w-8 md:h-10 md:w-10 rounded-lg text-xs md:text-sm font-bold transition flex items-center justify-center border
                                        ${isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 border-blue-600 z-10' : ''}
                                        ${isAnswered ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}
                                    `}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs font-medium space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-600"><div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2"/> Answered</span>
                        <span className="font-bold">{Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-600"><div className="w-2 h-2 md:w-3 md:h-3 bg-gray-300 rounded-full mr-2"/> Unanswered</span>
                        <span className="font-bold">{questions.length - Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-blue-600"><div className="w-2 h-2 md:w-3 md:h-3 border-2 border-blue-600 rounded-full mr-2"/> Current</span>
                        <span className="font-bold">#{currentQIndex + 1}</span>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-8 w-full">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-10 min-h-[50vh]">
                        <div className="mb-4 md:mb-6 flex justify-between items-center">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                Question {currentQIndex + 1} of {questions.length}
                             </span>
                            <span className="md:hidden text-[10px] font-bold text-gray-400">
                                {Object.keys(answers).length}/{questions.length} Done
                            </span>
                        </div>

                        <h2 className="text-lg md:text-2xl font-medium text-gray-800 mb-6 md:mb-8 leading-relaxed break-words">
                            {question.text}
                        </h2>

                        <div className="space-y-3">
                            {['optionA', 'optionB', 'optionC', 'optionD'].map((optKey) => (
                                <button
                                    key={optKey}
                                onClick={() => handleAnswerSelect(question.id, optKey)}
                                className={`
                                    w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex items-start md:items-center group
                                    ${answers[question.id] === optKey 
                                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                    }
                                `}
                                >
                                <div className={`
                                    w-5 h-5 md:w-6 md:h-6 rounded-full border-2 mr-3 md:mr-4 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0
                                    ${answers[question.id] === optKey ? 'border-blue-500' : 'border-gray-300'}
                                `}>
                                {answers[question.id] === optKey && <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500" />}
                                </div>
                                <span className="text-sm md:text-base text-gray-700 font-medium break-words">
                                    <span className="font-bold mr-2 uppercase text-xs md:text-sm">{optKey.replace('option', '')}.</span>
                                     {question[optKey]}
                                </span>
                                </button>
                             ))}
                        </div>

                        <div className="flex justify-between mt-8 md:mt-10 pt-6 border-t border-gray-100">
                             <button 
                                disabled={currentQIndex === 0}
                                onClick={() => setCurrentQIndex(prev => prev - 1)}
                                className="flex items-center text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 font-medium text-sm md:text-base"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" /> Previous
                             </button>
                            
                            <button 
                                disabled={currentQIndex === questions.length - 1}
                                onClick={() => setCurrentQIndex(prev => prev + 1)}
                                className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:hover:text-blue-600 font-medium text-sm md:text-base"
                            >
                                Next <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </div>
    );
        }
    // 5. RESULT SCREEN
  if (view === 'result') {
    const totalPossibleScore = questions.length * marksPerQuestion;
    const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;
    const isPass = percentage >= 40;
    return (
      <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center">
            
            <div className="mb-2">
                <h3 className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider">{appName}</h3>
                <h1 className="text-xl md:text-2xl font-bold text-blue-600 uppercase">{testTitle}</h1>
            </div>

            <div className="mb-4 mt-6 flex justify-center">
              {isPass ? <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500" /> : <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500" />}
            </div>

            <h2 className="text-lg md:text-xl font-medium text-black mb-2">Test Completed</h2>
            
            {/* GUEST ID BADGE - RESULT SCREEN (Below Test Completed) */}
            <div className="mb-6">
                 <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full border border-blue-100">
                    {guestId}
                 </span>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
               <div className="text-center bg-gray-50 p-4 rounded-xl w-full md:w-1/3">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Score</span>
                  <span className={`text-3xl font-extrabold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                      {score} / {totalPossibleScore}
                  </span>
               </div>
               <div className="text-center bg-gray-50 p-4 rounded-xl w-full md:w-1/3">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Percentage</span>
                  <span className={`text-3xl font-extrabold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                      {percentage}%
                  </span>
               </div>
            </div>
            <button 
              onClick={() => setView('welcome')}
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center mx-auto w-full md:w-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Back to Home
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                Detailed Test Review
             </div>
             <div className="divide-y divide-gray-100">
                {questions.map((q, idx) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correctAnswer;
                    const skipped = !userAns;
                    return (
                        <div key={q.id} className="p-4 md:p-6">
                            <div className="flex gap-3">
                                <span className="font-bold text-gray-400 text-sm md:text-base">{idx + 1}.</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 mb-3 text-sm md:text-base break-words">{q.text}</p>
                            
                                    <div className="flex flex-col gap-2 text-xs md:text-sm">
                                        <div className={`flex items-start p-2 rounded ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                            <span className="font-bold w-20 md:w-24 flex-shrink-0 uppercase text-[10px] md:text-xs mt-0.5">Your Answer:</span>
                                            <span className="break-words">
                                                {skipped ? <span className="italic text-gray-500">Skipped</span> : 
                                                    <span><span className="font-bold uppercase mr-1">{userAns.replace('option','')}</span> {q[userAns]}</span>
                                                }
                                                {isCorrect && <CheckCircle className="inline w-3 h-3 md:w-4 md:h-4 ml-2"/>}
                                                {!isCorrect && !skipped && <XCircle className="inline w-3 h-3 md:w-4 md:h-4 ml-2"/>}
                                            </span>
                                        </div>

                                        {!isCorrect && (
                                            <div className="flex items-start p-2 rounded bg-green-50 text-green-800">
                                                <span className="font-bold w-20 md:w-24 flex-shrink-0 uppercase text-[10px] md:text-xs mt-0.5">Correct Answer:</span>
                                                <span className="break-words">
                                                    <span className="font-bold uppercase mr-1">{q.correctAnswer.replace('option','')}</span>
                                                    {q[q.correctAnswer]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
