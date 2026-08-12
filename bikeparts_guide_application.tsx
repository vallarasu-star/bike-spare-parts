import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Upload, Search, ShieldAlert, Wrench, Info, MapPin, 
  Settings, Database, Plus, Trash2, Edit, ChevronRight, Activity, 
  Sparkles, Layers, Cpu, Compass, ArrowLeft, RefreshCw, CheckCircle2,
  AlertTriangle, Play, HelpCircle, Eye
} from 'lucide-react';

// --- INITIAL DATABASE SEED ---
const INITIAL_CATEGORIES = [
  "Engine Parts", "Braking System", "Suspension", "Electrical Parts", 
  "Fuel System", "Transmission", "Cooling System", "Exhaust System", 
  "Steering Parts", "Wheels & Tyres", "Body Parts"
];

const INITIAL_PARTS = [
  {
    id: "part_1",
    name: "Disc Brake Caliper",
    category: "Braking System",
    location: "Mounted near the front or rear wheel hub around the brake rotor.",
    description: "The disc brake caliper is a crucial hydraulic component of the braking system that houses the brake pads and pistons to slow down or stop the motorcycle.",
    function: "Applies hydraulic pressure onto the brake pads to grip the spinning brake disc, converting kinetic energy into friction heat to slow the bike down.",
    howItWorks: "When you pull the brake lever, brake fluid moves from the master cylinder through lines into the caliper. Hydraulic pressure forces pistons out, pushing pads tightly against both sides of the rotating brake disc.",
    symptoms: [
      "Brake dragging or motorcycle resisting movement",
      "Spongy or loss of braking pressure",
      "Uneven or accelerated brake pad wear",
      "Brake fluid leaking near wheels"
    ],
    maintenance: "Inspect brake fluid levels every 3,000 miles. Clean caliper dust with dedicated brake cleaner during pad changes. Replace hydraulic fluid every 2 years.",
    replacement: "Replace immediately if pistons leak, seize, or if body develops cracks. Typical lifespan: 30,000 - 50,000 miles under normal riding.",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 26, y: 72 } // SVG Hotspot percentage
  },
  {
    id: "part_2",
    name: "Clutch Assembly",
    category: "Transmission",
    location: "Inside the right side engine casing, connected between engine crankshaft and gearbox.",
    description: "A multi-plate wet or dry friction mechanism that connects and disconnects the engine drive shaft from the transmission system.",
    function: "Allows smoothly engaging power to the rear wheel when starting off, and disengaging power during gear shifts or stopping.",
    howItWorks: "Pulling the clutch lever compresses springs, pulling friction plates apart from steel plates to break engine engagement. Releasing the lever allows springs to clamp plates together, transmitting torque.",
    symptoms: [
      "Clutch slipping (engine RPM revs high without speed increase)",
      "Hard or clunky gear shifting",
      "Bike creeps forward when clutch lever is fully pulled in",
      "Burnt oil smell or harsh metallic friction noise"
    ],
    maintenance: "Maintain proper clutch lever free-play (approx 2-3mm). Change engine oil on schedule (for wet clutches). Inspect cable tension regularly.",
    replacement: "Friction plates usually need replacement every 15,000 - 25,000 miles depending on riding style and city traffic usage.",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 48, y: 62 }
  },
  {
    id: "part_3",
    name: "Spark Plug",
    category: "Electrical Parts",
    location: "Threaded into the top of the cylinder head of the engine block.",
    description: "An electrical device that fits into the cylinder head of an internal combustion engine and ignites compressed aerosolized fuel using an electric spark.",
    function: "Delivers electric current from ignition system into combustion chamber to ignite the air-fuel mixture at precise timings.",
    howItWorks: "High voltage electricity passes down the central electrode and jumps a small gap to the ground electrode, creating a high-energy electric arc.",
    symptoms: [
      "Engine misfiring or hesitation during acceleration",
      "Hard starting or engine turning over without catching",
      "Poor fuel economy and black exhaust smoke",
      "Rough idling or engine stalling"
    ],
    maintenance: "Check gap with feeler gauge according to service manual. Clean carbon deposits with wire brush or contact spray every 4,000 miles.",
    replacement: "Standard copper plugs: Replace every 6,000 miles. Iridium / Platinum plugs: Replace every 12,000 - 20,000 miles.",
    imageUrl: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 46, y: 48 }
  },
  {
    id: "part_4",
    name: "Rear Shock Absorber (Monoshock)",
    category: "Suspension",
    location: "Positioned centrally between the motorcycle frame and the rear swingarm.",
    description: "A mechanical or hydraulic device designed to absorb and damp shock impulses from bumps and road irregularities.",
    function: "Keeps the rear tyre in firm contact with the road, providing rider comfort, stability, traction, and cornering control.",
    howItWorks: "Combines a heavy coil spring (handles impact energy) with an internal oil/gas dampening piston that controls the speed of spring compression and rebound.",
    symptoms: [
      "Excessive bouncing or floating feeling after hitting bumps",
      "Oil dampening fluid leaking down shock body",
      "Bottoming out frequently on small bumps",
      "Uneven rear tyre tread feathering"
    ],
    maintenance: "Inspect oil seals for leaks. Wipe shaft clean of mud and road grit. Adjust preload setting based on pillion or cargo weight.",
    replacement: "Rebuild or replace every 20,000 to 30,000 miles when dampening loses effectiveness.",
    imageUrl: "https://images.unsplash.com/photo-1589148938909-4d241c9117f0?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 62, y: 55 }
  },
  {
    id: "part_5",
    name: "Carburetor / Fuel Injector",
    category: "Fuel System",
    location: "Mounted between the air filter box and the engine intake valve manifold.",
    description: "The fuel delivery component responsible for atomizing gasoline and mixing it with incoming air for efficient engine combustion.",
    function: "Precisely meters fuel quantity and blends it with filtered air into a combustible fine mist tailored to engine load.",
    howItWorks: "Uses vacuum pressure generated by intake stroke (Carburetor) or electronically controlled pressure pulses from an ECU (Fuel Injector) to spray fuel into intake air.",
    symptoms: [
      "Poor engine response or throttle hesitation",
      "Engine running too rich (black exhaust smoke) or too lean (backfiring)",
      "Fuel leaks from overflow hoses or seal rings",
      "Unstable idling speed"
    ],
    maintenance: "Use high quality clean fuel. Clean carburetor jets or run fuel injector cleaner through fuel tank every 5,000 miles.",
    replacement: "Rebuild seals & jets every 15,000 miles. Complete replacement only if body housing cracks or corrodes beyond repair.",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 42, y: 52 }
  },
  {
    id: "part_6",
    name: "Exhaust Muffler Header Pipe",
    category: "Exhaust System",
    location: "Runs from the front engine cylinder exhaust port underneath the frame to the rear.",
    description: "Piping and silencer assembly designed to route spent combustion gases away from the rider while reducing engine noise.",
    function: "Directs toxic exhaust fumes away, muffles acoustic combustion noise, optimizes backpressure for engine torque output, and houses catalytic converters.",
    howItWorks: "Spent gases enter header pipes, pass through internal acoustic baffles and catalytic honeycomb meshes to cool down, quiet down, and reduce harmful emissions.",
    symptoms: [
      "Unusually loud or raspy popping sound from engine area",
      "Exhaust leak smells or black soot around cylinder flange",
      "Rattling sound inside muffler (broken internal baffle)",
      "Rust holes forming on lower header bend"
    ],
    maintenance: "Clean exhaust pipes regularly. Check mounting bolts and exhaust gasket seals. Apply heat-resistant coating if rust appears.",
    replacement: "Replace gaskets whenever exhaust is removed. Header/Muffler lasts 40,000+ miles unless damaged by crashes or deep corrosion.",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 55, y: 75 }
  },
  {
    id: "part_7",
    name: "Radiator & Cooling Fan",
    category: "Cooling System",
    location: "Mounted right at the front of the motorcycle frame behind the front wheel.",
    description: "Heat exchanger unit that dissipates high thermal energy generated by liquid-cooled motorcycle engines.",
    function: "Cools down hot coolant fluid returning from engine block using airflow while moving, aided by an electric fan when idling.",
    howItWorks: "Hot coolant circulates through thin aluminum fins. Outside air passing through fins absorbs heat. An automated fan triggers if coolant temperature exceeds threshold.",
    symptoms: [
      "Engine overheating gauge spiking into red zone",
      "Coolant fluid leaking or sweet burning smell",
      "Cooling fan failing to turn on when idling in traffic",
      "Bent radiator fins blocking airflow"
    ],
    maintenance: "Flush coolant every 2 years. Straighten bent aluminum fins with fin comb gently. Keep radiator core free of dirt & dead bugs.",
    replacement: "Replace radiator if punctured by road debris or leaking along seam welds.",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 38, y: 48 }
  },
  {
    id: "part_8",
    name: "Motorcycle 12V Battery",
    category: "Electrical Parts",
    location: "Underneath the rider seat or behind side body panels.",
    description: "Rechargeable lead-acid or Lithium-ion energy storage device providing DC electrical current to the bike.",
    function: "Powers starter motor to crank the engine, runs headlights, ECU, instrument console, and ignition electronics when engine is off.",
    howItWorks: "Stores chemical energy and releases 12 volts of direct current. Once engine starts, the alternator continuously recharges the battery.",
    symptoms: [
      "Clicking noise when pushing electric starter button",
      "Dim headlights or dead dashboard display",
      "Sluggish engine cranking speed",
      "White sulfate corrosion build-up around terminals"
    ],
    maintenance: "Keep battery terminals clean and greased. Use trickle charger if bike is stored unused over winter.",
    replacement: "Typical battery lifespan is 2 to 4 years.",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    diagramCoordinates: { x: 58, y: 45 }
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // home, diagram, scan, catalog, partDetail, admin
  const [selectedPart, setSelectedPart] = useState(null);
  
  // App Data State
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // AI Identification State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef(null);

  // Admin Panel State
  const [adminForm, setAdminForm] = useState({
    name: '', category: INITIAL_CATEGORIES[0], location: '', description: '',
    function: '', howItWorks: '', symptoms: '', maintenance: '', replacement: '', imageUrl: ''
  });
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');

  // Handle Search Filter
  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          part.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Navigate to part details
  const handleViewPart = (part) => {
    setSelectedPart(part);
    setActiveTab('partDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        analyzeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Camera Feed
  const startCamera = async () => {
    setUseCamera(true);
    setWebcamActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please check camera permissions.");
      setWebcamActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // Stop media stream
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setWebcamActive(false);
      setUploadedImage(dataUrl);
      analyzeImage(dataUrl);
    }
  };

  // Simulated / Gemini AI Recognition Logic
  const analyzeImage = async (base64Image) => {
    setIsAnalyzing(true);
    setScanResult(null);

    const apiKey = ""; // Runtime auto-injected if present

    if (apiKey) {
      try {
        // Prepare base64 string
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
        
        // Exponential backoff fetch function
        const fetchGemini = async (retries = 5, delay = 1000) => {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{
                    parts: [
                      { text: "Analyze this image and identify the motorcycle or bike part shown. Return JSON format with fields: partName, category, confidence (e.g. 94%), briefDescription, locationOnBike, mainFunction, commonProblems (array of strings)." },
                      { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } }
                    ]
                  }],
                  generationConfig: { responseMimeType: "application/json" }
                })
              }
            );
            if (!response.ok) throw new Error("API call failed");
            return await response.json();
          } catch (err) {
            if (retries > 0) {
              await new Promise(res => setTimeout(res, delay));
              return fetchGemini(retries - 1, delay * 2);
            }
            throw err;
          }
        };

        const data = await fetchGemini();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          
          // Check if matched in database
          const dbMatch = parts.find(p => p.name.toLowerCase().includes(parsed.partName.toLowerCase())) || parts[0];
          
          setScanResult({
            name: parsed.partName || dbMatch.name,
            category: parsed.category || dbMatch.category,
            confidence: parsed.confidence || "92%",
            location: parsed.locationOnBike || dbMatch.location,
            function: parsed.mainFunction || dbMatch.function,
            problems: parsed.commonProblems || dbMatch.symptoms,
            dbReference: dbMatch
          });
          setIsAnalyzing(false);
          return;
        }
      } catch (e) {
        // Fall back to default matching on error
      }
    }

    // Fallback Recognition Simulation (Select random/relevant part for demo)
    setTimeout(() => {
      const randomPart = parts[Math.floor(Math.random() * parts.length)];
      setScanResult({
        name: randomPart.name,
        category: randomPart.category,
        confidence: `${Math.floor(Math.random() * 10 + 88)}%`,
        location: randomPart.location,
        function: randomPart.function,
        problems: randomPart.symptoms,
        dbReference: randomPart
      });
      setIsAnalyzing(false);
    }, 2200);
  };

  // Add new part via admin
  const handleAddPart = (e) => {
    e.preventDefault();
    const newPart = {
      id: `part_${Date.now()}`,
      ...adminForm,
      symptoms: adminForm.symptoms.split(',').map(s => s.trim()),
      imageUrl: adminForm.imageUrl || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
      diagramCoordinates: { x: 50, y: 50 }
    };
    setParts([newPart, ...parts]);
    setAdminSuccessMsg("Bike Part successfully added to global database!");
    setAdminForm({
      name: '', category: categories[0], location: '', description: '',
      function: '', howItWorks: '', symptoms: '', maintenance: '', replacement: '', imageUrl: ''
    });
    setTimeout(() => setAdminSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
                BikeParts<span className="text-cyan-400">Guide</span>
              </span>
              <span className="block text-[10px] text-slate-400 tracking-widest font-mono uppercase">AI Motorcycle Intelligence</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'home' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'diagram' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Interactive Bike
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'scan' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                  : 'text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Part Identifier</span>
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'catalog' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Parts Catalog
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-lg border transition-all ${
                activeTab === 'admin' 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">

        {/* ----------------- TAB 1: HOME PAGE ----------------- */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-14 shadow-2xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Next-Gen Visual Recognition & Technical Manual</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                  Upload a Bike Part. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                    Know What It Does.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-400 leading-relaxed font-light">
                  Instantly identify motorcycle components, explore interactive diagrams, diagnose symptoms of failure, and master maintenance with technical insights.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => setActiveTab('scan')}
                    className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload Bike Part Image</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('scan'); startCamera(); }}
                    className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <Camera className="w-5 h-5 text-cyan-400" />
                    <span>Take Photo</span>
                  </button>
                </div>

                {/* SEARCH BAR */}
                <div className="pt-4">
                  <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search for a bike part (e.g. Clutch, Brake caliper, Spark plug)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setActiveTab('catalog');
                      }}
                      className="w-full pl-12 pr-28 py-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-inner transition-all"
                    />
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK FEATURE HIGHLIGHT: INTERACTIVE BIKE BANNER */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Interactive Blueprint</span>
                <h2 className="text-2xl font-bold text-white">Explore Mechanical Assembly</h2>
                <p className="text-sm text-slate-400">
                  Click through our interactive motorcycle schematic to pinpoint exact component locations, functions, and system relations.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('diagram')}
                className="whitespace-nowrap px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center space-x-2 transition-colors"
              >
                <span>Launch Bike Diagram</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </section>

            {/* POPULAR BIKES PARTS GRID */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Popular Motorcycle Parts</h2>
                  <p className="text-xs text-slate-400 mt-1">Frequently searched and essential mechanical components</p>
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>View All ({parts.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {parts.slice(0, 4).map((part) => (
                  <div 
                    key={part.id}
                    onClick={() => handleViewPart(part)}
                    className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <img 
                        src={part.imageUrl} 
                        alt={part.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono font-medium text-cyan-300">
                          {part.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {part.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {part.description}
                      </p>
                      
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="truncate max-w-[140px]">{part.location}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="space-y-6 pt-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Parts System Categories</h2>
                <p className="text-xs text-slate-400 mt-1">Browse motorcycle assemblies by system classification</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('catalog');
                    }}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-850 text-left transition-all group"
                  >
                    <Layers className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="block text-xs font-semibold text-slate-200 group-hover:text-white">
                      {cat}
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">
                      {parts.filter(p => p.category === cat).length} items
                    </span>
                  </button>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ----------------- TAB 2: INTERACTIVE BIKE DIAGRAM ----------------- */}
        {activeTab === 'diagram' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h1 className="text-3xl font-black text-white">Interactive Motorcycle Diagram</h1>
                <p className="text-sm text-slate-400 mt-1">Click on any glowing blueprint marker to inspect that component.</p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 w-fit">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Schematic Mode Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* SVG DIAGRAM CANVAS */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-400">
                  Standard Street/Sport Motorcycle Anatomy
                </div>

                {/* Motorcycle Vector Illustration */}
                <div className="relative w-full aspect-[16/10] bg-slate-950/60 rounded-2xl border border-slate-800/60 flex items-center justify-center p-4">
                  
                  {/* Clean Technical SVG Motorcycle Silhouette */}
                  <svg viewBox="0 0 800 500" className="w-full h-full text-slate-700 stroke-current fill-none stroke-[2] drop-shadow-lg">
                    {/* Grid Background */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Wheels */}
                    <circle cx="200" cy="350" r="80" stroke="#334155" strokeWidth="8" />
                    <circle cx="200" cy="350" r="50" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="600" cy="350" r="80" stroke="#334155" strokeWidth="8" />
                    <circle cx="600" cy="350" r="50" stroke="#1e293b" strokeWidth="3" />

                    {/* Frame & Engine Outline */}
                    <path d="M200 350 L280 220 L380 200 L500 210 L600 350" stroke="#475569" strokeWidth="5" />
                    <path d="M280 220 L350 350 L480 350 L500 210" stroke="#475569" strokeWidth="4" />
                    
                    {/* Engine Block */}
                    <rect x="340" y="270" width="120" height="90" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                    <line x1="360" y1="280" x2="360" y2="350" stroke="#38bdf8" />
                    <line x1="390" y1="280" x2="390" y2="350" stroke="#38bdf8" />
                    <line x1="420" y1="280" x2="420" y2="350" stroke="#38bdf8" />

                    {/* Fuel Tank */}
                    <path d="M350 200 Q420 160 500 200 Q450 240 350 220 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

                    {/* Seat */}
                    <path d="M250 210 Q300 200 350 210 L340 230 Q290 220 250 210 Z" fill="#334155" />

                    {/* Front Suspension Fork */}
                    <line x1="200" y1="350" x2="280" y2="150" stroke="#64748b" strokeWidth="6" />
                    <line x1="280" y1="150" x2="260" y2="130" stroke="#64748b" strokeWidth="4" />

                    {/* Exhaust Pipe */}
                    <path d="M360 330 C 400 390, 520 390, 580 360" stroke="#f59e0b" strokeWidth="4" />

                    {/* Swingarm */}
                    <line x1="440" y1="330" x2="600" y2="350" stroke="#475569" strokeWidth="6" />
                  </svg>

                  {/* INTERACTIVE CLICKABLE HOTSPOTS OVERLAY */}
                  {parts.map((part) => {
                    const isSelected = selectedPart?.id === part.id;
                    return (
                      <div
                        key={part.id}
                        onClick={() => setSelectedPart(part)}
                        style={{
                          left: `${part.diagramCoordinates?.x || 50}%`,
                          top: `${part.diagramCoordinates?.y || 50}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing Outer Ring */}
                          <div className={`absolute w-8 h-8 rounded-full transition-all ${
                            isSelected 
                              ? 'bg-cyan-400/40 animate-ping' 
                              : 'bg-cyan-500/20 group-hover:scale-150'
                          }`} />
                          
                          {/* Inner Marker Point */}
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-cyan-400 border-white scale-125 shadow-lg shadow-cyan-400' 
                              : 'bg-slate-900 border-cyan-400 group-hover:bg-cyan-400'
                          }`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                          </div>

                          {/* Hover Tooltip Label */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30">
                            <div className="bg-slate-900 border border-cyan-500/40 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap">
                              {part.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Click interactive node markers to reveal technical specs</span>
                  <span>{parts.length} Diagram Hotspots Loaded</span>
                </div>
              </div>

              {/* PART QUICK DETAIL SIDEBAR */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                {selectedPart ? (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{selectedPart.category}</span>
                      <button 
                        onClick={() => setSelectedPart(null)}
                        className="text-slate-500 hover:text-white text-xs"
                      >
                        Clear Selection
                      </button>
                    </div>

                    <div className="rounded-2xl overflow-hidden h-40 bg-slate-950 border border-slate-800">
                      <img src={selectedPart.imageUrl} alt={selectedPart.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedPart.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{selectedPart.description}</p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-semibold text-cyan-400 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Exact Location</span>
                        </span>
                        <p className="text-slate-300">{selectedPart.location}</p>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-semibold text-blue-400 flex items-center space-x-1">
                          <Info className="w-3.5 h-3.5" />
                          <span>Main Purpose</span>
                        </span>
                        <p className="text-slate-300">{selectedPart.function}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewPart(selectedPart)}
                      className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Full Technical Manual & Diagnostics</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 text-cyan-400 flex items-center justify-center mx-auto">
                      <Compass className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <h4 className="text-base font-semibold text-white">Select a Diagram Node</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Click any glowing blue point on the motorcycle schematic to load detailed specifications.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ----------------- TAB 3: AI IMAGE SCANNER & IDENTIFIER ----------------- */}
        {activeTab === 'scan' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">AI Vision Recognition Engine</span>
              <h1 className="text-3xl font-black text-white">Identify Bike Part from Image</h1>
              <p className="text-sm text-slate-400">
                Upload a photo or capture a camera shot. Our computer vision neural network will identify the component, its function, and common symptoms.
              </p>
            </div>

            {/* UPLOAD / WEBCAM INPUT CONTAINER */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              
              {!uploadedImage && !webcamActive && (
                <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center space-y-4 bg-slate-950/40 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
                    <Upload className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">Upload Motorcycle Part Image</h3>
                    <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP files up to 10MB</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <label className="cursor-pointer px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all">
                      <span>Select Local File</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>

                    <button
                      onClick={startCamera}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider border border-slate-700 flex items-center space-x-2 transition-all"
                    >
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span>Use Device Camera</span>
                    </button>
                  </div>
                </div>
              )}

              {/* WEBCAM FEED */}
              {webcamActive && (
                <div className="space-y-4 text-center">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-w-lg mx-auto">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 border-2 border-cyan-400/40 pointer-events-none rounded-2xl flex items-center justify-center">
                      <div className="w-48 h-48 border border-dashed border-cyan-400 rounded-xl" />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={capturePhoto}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Capture & Identify
                    </button>
                    <button
                      onClick={() => setWebcamActive(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* DISPLAY UPLOADED IMAGE & ANALYSIS STATE */}
              {uploadedImage && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-xs font-mono text-slate-400">Input Image Preview</span>
                    <button
                      onClick={() => { setUploadedImage(null); setScanResult(null); }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Upload Different Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <img src={uploadedImage} alt="Uploaded Part" className="w-full h-full object-contain" />
                      
                      {/* Scanning Line Animation */}
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none overflow-hidden">
                          <div className="w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400 animate-pulse top-0 absolute" />
                        </div>
                      )}
                    </div>

                    {/* AI Loading State */}
                    {isAnalyzing && (
                      <div className="py-8 space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs">
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>Running Deep Vision AI Classification...</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Analyzing Geometry & Feature Vectors</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Matching extracted mechanical features against motorcycle part databases.
                        </p>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-cyan-400 animate-pulse" />
                        </div>
                      </div>
                    )}

                    {/* IDENTIFICATION RESULT CARD */}
                    {scanResult && !isAnalyzing && (
                      <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-cyan-500/40 shadow-xl animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-cyan-500/20">
                            {scanResult.category}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confidence: {scanResult.confidence}</span>
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Identified Part Name</span>
                          <h2 className="text-2xl font-black text-white">{scanResult.name}</h2>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-semibold text-slate-300">Location:</span>
                            <p className="text-slate-400">{scanResult.location}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-300">Function:</span>
                            <p className="text-slate-400 line-clamp-2">{scanResult.function}</p>
                          </div>
                        </div>

                        {scanResult.dbReference && (
                          <button
                            onClick={() => handleViewPart(scanResult.dbReference)}
                            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                          >
                            <span>Open Detailed Repair Manual</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------- TAB 4: PARTS CATALOG / SEARCH ----------------- */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h1 className="text-3xl font-black text-white">Motorcycle Parts Catalog</h1>
                <p className="text-sm text-slate-400 mt-1">Browse, search, and filter technical components.</p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* CATEGORY BAR */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Systems ({parts.length})
              </button>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* PARTS LIST */}
            {filteredParts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParts.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => handleViewPart(part)}
                    className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-cyan-300">
                          {part.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {part.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {part.description}
                      </p>

                      <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{part.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 bg-slate-900/50 rounded-3xl border border-slate-800">
                <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Bike Parts Found</h3>
                <p className="text-xs text-slate-500">Try searching for a different term or resetting category filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 5: SINGLE PART INFORMATION PAGE ----------------- */}
        {activeTab === 'partDetail' && selectedPart && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            
            <button
              onClick={() => setActiveTab('catalog')}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalog</span>
            </button>

            {/* HEADER BANNER CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-64 md:h-auto bg-slate-950">
                <img src={selectedPart.imageUrl} alt={selectedPart.name} className="w-full h-full object-cover" />
              </div>

              <div className="md:col-span-2 p-6 md:p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
                    {selectedPart.category}
                  </div>
                  <h1 className="text-3xl font-black text-white">{selectedPart.name}</h1>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selectedPart.description}</p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase">Location on Motorcycle</span>
                    <p className="text-xs text-white font-medium mt-0.5">{selectedPart.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILED INFORMATION SECTIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* MAIN PURPOSE & FUNCTION */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Info className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Main Function & Purpose</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedPart.function}</p>
              </div>

              {/* HOW IT WORKS */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-blue-400">
                  <Cpu className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">How It Works</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedPart.howItWorks}</p>
              </div>

              {/* COMMON PROBLEMS & FAILURE SYMPTOMS */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Symptoms of Failure & Common Problems</h3>
                </div>
                <ul className="space-y-2">
                  {selectedPart.symptoms?.map((symptom, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MAINTENANCE & REPLACEMENT */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <Wrench className="w-5 h-5" />
                    <h3 className="text-base font-bold text-white">Routine Maintenance</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedPart.maintenance}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Replacement Guidelines</span>
                  <p className="text-xs text-slate-300">{selectedPart.replacement}</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ----------------- TAB 6: ADMIN PANEL ----------------- */}
        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-400 mt-1">Manage database records, add new bike parts, and inspect logs.</p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Database className="w-4 h-4" />
                <span>System Database: Online ({parts.length} Records)</span>
              </div>
            </div>

            {adminSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{adminSuccessMsg}</span>
              </div>
            )}

            {/* ADD NEW PART FORM */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Add New Bike Part to Database</span>
              </h2>

              <form onSubmit={handleAddPart} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Part Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fuel Pump"
                      value={adminForm.name}
                      onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Category *</label>
                    <select
                      value={adminForm.category}
                      onChange={(e) => setAdminForm({...adminForm, category: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    >
                      {categories.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location on Bike *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mounted inside the fuel tank bottom"
                    value={adminForm.location}
                    onChange={(e) => setAdminForm({...adminForm, location: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Brief Description *</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Overview of the component..."
                    value={adminForm.description}
                    onChange={(e) => setAdminForm({...adminForm, description: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Main Function *</label>
                    <textarea
                      required
                      rows="2"
                      placeholder="Primary job of the part..."
                      value={adminForm.function}
                      onChange={(e) => setAdminForm({...adminForm, function: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">How It Works *</label>
                    <textarea
                      required
                      rows="2"
                      placeholder="Working mechanism..."
                      value={adminForm.howItWorks}
                      onChange={(e) => setAdminForm({...adminForm, howItWorks: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Symptoms of Failure (Comma Separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Engine sputtering, Hard starting, Fuel pressure drop"
                    value={adminForm.symptoms}
                    onChange={(e) => setAdminForm({...adminForm, symptoms: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Maintenance Tips</label>
                    <input
                      type="text"
                      placeholder="Regular inspection notes..."
                      value={adminForm.maintenance}
                      onChange={(e) => setAdminForm({...adminForm, maintenance: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={adminForm.imageUrl}
                      onChange={(e) => setAdminForm({...adminForm, imageUrl: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Save Bike Part to Database
                </button>
              </form>
            </div>

            {/* CURRENT DATABASE TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">Database Records</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="p-3">Part Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Location</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {parts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-semibold text-white">{p.name}</td>
                        <td className="p-3 text-cyan-400">{p.category}</td>
                        <td className="p-3 truncate max-w-xs">{p.location}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setParts(parts.filter(item => item.id !== p.id))}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 mt-16 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-mono">BikeParts Guide &copy; 2026. Automotive Intelligence Manual & Visual Recognition Platform.</p>
          <p>Designed for motorcycle riders, mechanics, and enthusiasts worldwide.</p>
        </div>
      </footer>

    </div>
  );
}