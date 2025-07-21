import '../styles/globals.css';
import React, { useState, useEffect, useRef } from 'react';

// Custom Alert Component
const CustomAlert = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-md w-full">
            <p className="text-xl font-semibold text-blue-300">{message}</p>
            <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
                OK
            </button>
        </div>
    </div>
);

// Main App component
const App = () => {
    // State for spoiler toggle and content visibility
    const [spoilerOn, setSpoilerOn] = useState(false);

    // State for accordion selections
    const [selectedRaceName, setSelectedRaceName] = useState('');
    const [selectedConstructor, setSelectedConstructor] = useState('');
    const [selectedUpdatedComponent, setSelectedUpdatedComponent] = useState('');

    // State to manage which accordion content is open
    const [openAccordion, setOpenAccordion] = useState(null);

    // State to control visibility of the Details card
    const [showDetailsCard, setShowDetailsCard] = useState(false);

    // State to hold the data for the Details card
    const [detailsData, setDetailsData] = useState({
        updatedComponent: '',
        primaryReason: '',
        geometricDifferences: '',
        description: ''
    });

    // State for in-memory saved details
    const [savedDetailsList, setSavedDetailsList] = useState([]);
    // State to control visibility of the saved details view
    const [showSavedDetailsView, setShowSavedDetailsView] = useState(false);

    // State for custom alert message
    const [alertMessage, setAlertMessage] = useState(null);

    // Refs for accordion headers to manage arrow icons
    const raceHeaderRef = useRef(null);
    const teamHeaderRef = useRef(null);
    const upgradesHeaderRef = useRef(null);

    // 2025 Race Schedule Data
    const raceSchedule = [
        { name: "Moët & Chandon Belgian GP", circuit: "Circuit de Spa-Francorchamps", raceDate: new Date("2025-07-27T09:00:00") },
        { name: "Lenovo Hungarian GP", circuit: "Hungaroring", raceDate: new Date("2025-08-03T09:00:00") },
        { name: "Heineken Dutch GP", circuit: "Circuit Park Zandvoort", raceDate: new Date("2025-08-31T09:00:00") },
        { name: "Pirelli Italian GP", circuit: "Autodromo Nazionale Monza", raceDate: new Date("2025-09-07T09:00:00") },
        { name: "Qatar Airways Azerbaijan GP", circuit: "Baku City Circuit", raceDate: new Date("2025-09-21T07:00:00") },
        { name: "Singapore Airlines Singapore GP", circuit: "Marina Bay Street Circuit", raceDate: new Date("2025-10-05T08:00:00") },
        { name: "MSC Cruises United States GP", circuit: "Circuit of the Americas", raceDate: new Date("2025-10-19T15:00:00") },
        { name: "Mexico City GP", circuit: "Autodromo Hermanos Rodriguez", raceDate: new Date("2025-10-26T16:00:00") },
        { name: "MSC Cruises São Paulo GP", circuit: "Autodromo Jose Carlos Pace", raceDate: new Date("2025-11-09T12:00:00") },
        { name: "Heineken Las Vegas GP", circuit: "Las Vegas Street Circuit", raceDate: new Date("2025-11-22T23:00:00") },
        { name: "Qatar Airways Qatar GP", circuit: "Losail International Circuit", raceDate: new Date("2025-11-30T11:00:00") },
        { name: "Etihad Airways Abu Dhabi GP", circuit: "Yas Marina Circuit", raceDate: new Date("2025-12-07T08:00:00") },
    ];

    // Upgrade Data (unchanged)
    const upgradeData = [
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Body",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Revised floor geometry",
        "Description": "The complete floor has been revised resulting in improved flow conditioning and a redistribution of suction to gain overall aerodynamic performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Rear Corner",
        "PrimaryReason": "Performance - Flow Conditioning",
        "GeometricDifferences": "Revised Rear Corner Inlet",
        "Description": "Modification to Rear Brake Duct Inlet aiming at overall improvement in local flow conditioning for improved aerodynamic and brake cooling performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "RB",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Body",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Re-profiled surfaces to supplement the changes to the fences",
        "Description": "Revised surfaces to improve pressure distribution over the length of the floor allowing more load to be extracted whilst maintaining adequate flow stability."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Body",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "The shape of the main body of the floor has evolved slightly as part of this update.",
        "Description": "The revised surfaces improve the flow structures under the floor increasing the local load on the lower surface and hence improving performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Floor Fences",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "The fences have revised curvature and local details.",
        "Description": "The revised surfaces improve the flow structures under the floor increasing the local load on the lower surface and hence improving performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Floor Edge",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Small changes to the details of the floor edge wing and the main floor inboard of this.",
        "Description": "The revised surfaces improve the flow structures under the floor increasing the local load on the lower surface and hence improving performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 4,
        "UpdatedComponent": "Coke/Engine Cover",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Change to the profile of the top deck of the bodywork.",
        "Description": "This revised shape is developed alongside the floor edge details to improve the performance of the floor as above."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Body",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Expansion rate changed on main floor",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Floor Fences",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Fences re-aligned",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Floor Edge",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Smaller Floor edge wing",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 4,
        "UpdatedComponent": "Sidepod Inlet",
        "PrimaryReason": "Performance - Flow Conditioning",
        "GeometricDifferences": "Profiled Sidepod Inlet geometry and Mirror update",
        "Description": "The revised sidepod inlet improves local flow alignment, enabling cleaner airflow delivery to the rear of the car, hence improving overall car performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "VRB",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Front Wing",
        "PrimaryReason": "Circuit specific - Balance Range",
        "GeometricDifferences": "New front wing flap geometry.",
        "Description": "The flap elements have been changed for smaller profiles, to cater for the low balance requirements of this and subsequent events."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "ATLASSIAN WILLIAMS RACING",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Fences",
        "PrimaryReason": "Performance - Flow Conditioning",
        "GeometricDifferences": "",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "STAKE F1 TEAM KICK SAUBER",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Floor Body",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Changes to forward floor area.",
        "Description": "In continuation of recent floor development, new forward floor geometry modifications are implemented at this event, gaining some efficient downforce."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "British Grand Prix",
        "Constructor": "STAKE F1 TEAM KICK SAUBER",
        "RequiredEventDisplay": "FORMULA 1 BRITISH GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Front Wing",
        "PrimaryReason": "Circuit specific - Balance Range",
        "GeometricDifferences": "New front wing flap design",
        "Description": "New front wing flap design with a reshaped flap geometry to provide a more efficient low balance flap option if lower downforce levels are used at this event."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "Medium-High Downforce Rear Wing",
        "Description": "A medium-high Downforce Rear Wing sitting between the medium and high downforce Rear Wing assemblies has been made available for this track, featuring an efficient reduction in Drag compared to the high downforce wing."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "Medium-High Downforce Beam Wing",
        "Description": "In order to ensure the high downforce Rear Wing assembly is suitable across multiple circuits, a Beamwing with medium-high level of load has been designed alongside the aforementioned assembly."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "Medium Downforce Beam Wing",
        "Description": "In order to ensure the high downforce Rear Wing assembly is suitable across multiple circuits, a Beamwing with a medium level of load has been designed alongside the aforementioned assembly."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 4,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Performance - Mechanical Setup",
        "GeometricDifferences": "Front Suspension Geometry Update",
        "Description": "In order to deal with the unique cornering challenges that this circuit brings, the front suspension geometry has been modified."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MCLAREN F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 5,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "Circuit specific - Cooling Range",
        "GeometricDifferences": "Increased Front Brake Cooling Option",
        "Description": "Given the significant brake cooling demand of this circuit, an option to increase brake cooling on the front axle is available to deploy should this be required."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "SCUDERIA FERRARI HP",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Circuit specific",
        "GeometricDifferences": "Modification to trackrod / suspension fairings and FBD scoop clearance",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "SCUDERIA FERRARI HP",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "",
        "GeometricDifferences": "",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "SCUDERIA FERRARI HP",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "Higher Downforce Top Rear Wing and Lower Rear Wing designs",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "SCUDERIA FERRARI HP",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 4,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "",
        "GeometricDifferences": "",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "RB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Rear wing",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "Enlarged rear wing upper and beam, for camber and chord",
        "Description": "The Monaco circuit rearwards aerodynamic load and the enlarged rear wing plus beam wing provides this at the lower car speeds encountered"
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "RB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Reliability",
        "GeometricDifferences": "Revised wishbone faring",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "RB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "Reliability",
        "GeometricDifferences": "Revised exit duct and gaitor",
        "Description": "To attain the necessary cooling for the front brakes, a larger exit duct is available with a consequential trim to the gaitor sealing the upper wishbone."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Front Wing",
        "PrimaryReason": "Circuit specific - Balance Range",
        "GeometricDifferences": "Front wing flap with more aggressive profiles.",
        "Description": "This is a higher loaded front wing flap to achieve the desired car setup to balance the more powerful rear wing also introduced at this event."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "More aggressive rear wing with more surface area.",
        "Description": "This rear wing generates more load than the versions which have been used previously this season and is introduced due the characteristics of this circuit."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "AM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Rear Corner",
        "PrimaryReason": "Circuit specific - Cooling Range",
        "GeometricDifferences": "The inlet is increased and the exit duct and the vanes surrounding it have been revised.",
        "Description": "The inlet and exit changes increase flow through the duct and hence cooling. The geometry has increased loading on the surfaces of the devices so raising the local load generated in the area."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "BWT ALPINE F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Performance – Mechanical Setup",
        "GeometricDifferences": "New trackrod fairing and supports to suit Monaco racetrack",
        "Description": "This modification to the front suspension increases the road wheel angle. This modification is needed for the specific circuit characteristics."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "BWT ALPINE F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "More loaded top rear wing main plane",
        "Description": "The top rear wing is more loaded, delivering more downforce and offering the best lap-time for the specific circuit characteristics of Monaco"
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "BWT ALPINE F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "Rear beam wing designed to work with the top rear wing update",
        "Description": "Similar to the rear wing, the beam wing features more load with the objective of delivering the best lap-time around Monaco."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "More cambered RW profile cluster",
        "Description": "This circuit-specific rear wing uses the full regulation box to maximize downforce, accepting the associated drag increase, which is less penalizing in Monaco compared to other circuits"
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Performance - Local Load",
        "GeometricDifferences": "More cambered Lower Rear Wing Profiles",
        "Description": "This option is tailored to operate with the more aggressive rear wing design, continuing to aim for increased downforce."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "MONEYGRAM HAAS F1 TEAM",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Performance - Mechanical Setup",
        "GeometricDifferences": "Front Trackrod position",
        "Description": "A minor adjustment to the front trackrod was needed to meet the circuit-specific steering angle requirements."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "VRB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "Circuit specific – Mechanical Setup",
        "GeometricDifferences": "The shape of the cooling exit duct and trackrod ends has been adjusted to increase clearance for high steer angles",
        "Description": "The steering angle required at Monaco increases the clearance requirements between suspension & brake duct components. This update addresses these clearance issues with a minimal change on aerodynamic performance."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "VRB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "A new double-element high downforce beam wing.",
        "Description": "The highly cambered and high incidence elements increase the downforce generated by the beam wing, whilst aerodynamically supporting the flow attachment of the upper wing."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "VRB",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "A new max downforce upper wing.",
        "Description": "The camber of the upper wing profiles is increased to maximise the load generated. The tip shape helps to improve the overall efficiency."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "ATLASSIAN WILLIAMS RACING",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "The rear wing for Monaco is a larger wing overall with a high angle of attack. It is the 2024 RWing that we ran in Monaco last year.",
        "Description": "The larger upper rear wing delivers more downforce and"
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "ATLASSIAN WILLIAMS RACING",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Beam Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "",
        "Description": "The larger beam wings and pylon wing work together to"
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "ATLASSIAN WILLIAMS RACING",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 3,
        "UpdatedComponent": "Front Suspension",
        "PrimaryReason": "Performance - Mechanical Setup",
        "GeometricDifferences": "",
        "Description": ""
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "ATLASSIAN WILLIAMS RACING",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 4,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "Circuit specific - Cooling Range",
        "GeometricDifferences": "There is a larger exit available for the front brake duct. This increases the brake disc/caliper cooling, which is appropriate for Monaco.",
        "Description": "The larger exit simply allows more air to flow through the brake duct assembly and therefore provides more cooling to the brake components. This effectively compensates for the lower straight-line speed in Monaco and the increased brake duty."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "STAKE F1 TEAM KICK SAUBER",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 1,
        "UpdatedComponent": "Rear Wing",
        "PrimaryReason": "Circuit specific - Drag Range",
        "GeometricDifferences": "High downforce rear wing assembly",
        "Description": "For this specific track and future events, we have introduced a new high-downforce rear wing assembly, which efficiently increases load."
      },
      {
        "Year": 2025,
        "RaceNo": 12,
        "RaceName": "Monaco Grand Prix",
        "Constructor": "STAKE F1 TEAM KICK SAUBER",
        "RequiredEventDisplay": "FORMULA 1 MONACO GRAND PRIX 2025",
        "ComponentNo": 2,
        "UpdatedComponent": "Front Corner",
        "PrimaryReason": "Circuit specific - Cooling Range",
        "GeometricDifferences": "New front brake duct design",
        "Description": "The new design offers an increased brake system cooling flow to accommodate the low average airspeed of this specific track."
      }
    ];

    // State for current race index and countdown
    const [currentRaceIndex, setCurrentRaceIndex] = useState(0);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

    // Function to calculate countdown
    const calculateCountdown = (targetDate) => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    };

    // Effect to update countdown and cycle through races
    useEffect(() => {
        const interval = setInterval(() => {
            const currentRace = raceSchedule[currentRaceIndex];
            const newCountdown = calculateCountdown(currentRace.raceDate);

            if (newCountdown.days < 0 && newCountdown.hours < 0 && newCountdown.minutes < 0) {
                setCurrentRaceIndex((prevIndex) => (prevIndex + 1) % raceSchedule.length);
            } else {
                setCountdown(newCountdown);
            }
        }, 1000);

        const initialRace = raceSchedule[currentRaceIndex];
        setCountdown(calculateCountdown(initialRace.raceDate));

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentRaceIndex, raceSchedule]);

    // Function to show custom alert
    const showAlert = (message) => {
        setAlertMessage(message);
    };

    // Function to close custom alert
    const closeAlert = () => {
        setAlertMessage(null);
    };

    // Function to toggle accordion visibility and icon
    const toggleAccordion = (accordionId) => {
        setOpenAccordion(prev => (prev === accordionId ? null : accordionId));

        // Manually update arrow icons using refs
        const headers = [raceHeaderRef, teamHeaderRef, upgradesHeaderRef];
        headers.forEach(ref => {
            if (ref.current) {
                const arrowSpan = ref.current.querySelector('span:last-child');
                if (arrowSpan) {
                    if (ref.current.id === `${accordionId}Header` && openAccordion !== accordionId) {
                        arrowSpan.innerHTML = '&#9650;'; // Up arrow
                    } else {
                        arrowSpan.innerHTML = '&#9660;'; // Down arrow
                    }
                }
            }
        });
    };

    // Handle race name selection change
    const handleRaceNameChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedRaceName(selectedValue);
        setSelectedConstructor('');
        setSelectedUpdatedComponent('');
        setShowDetailsCard(false);
        setDetailsData({
            updatedComponent: '',
            primaryReason: '',
            geometricDifferences: '',
            description: ''
        });

        if (selectedValue) {
            toggleAccordion('team');
        } else {
            setOpenAccordion(null);
        }
    };

    // Handle constructor (team) selection change
    const handleConstructorChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedConstructor(selectedValue);
        setSelectedUpdatedComponent('');
        setShowDetailsCard(false);
        setDetailsData({
            updatedComponent: '',
            primaryReason: '',
            geometricDifferences: '',
            description: ''
        });

        if (selectedValue) {
            toggleAccordion('upgrades');
        } else {
            toggleAccordion('race');
        }
    };

    // Handle updated component (upgrade) selection change
    const handleUpdatedComponentChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedUpdatedComponent(selectedValue);

        if (selectedValue) {
            const foundDetail = upgradeData.find(
                (item) =>
                    item.RaceName === selectedRaceName &&
                    item.Constructor === selectedConstructor &&
                    item.UpdatedComponent === selectedValue
            );

            if (foundDetail) {
                setDetailsData({
                    updatedComponent: foundDetail.UpdatedComponent,
                    primaryReason: foundDetail.PrimaryReason,
                    geometricDifferences: foundDetail.GeometricDifferences,
                    description: foundDetail.Description
                });
                setShowDetailsCard(true);
            } else {
                setShowDetailsCard(false);
                setDetailsData({
                    updatedComponent: '',
                    primaryReason: '',
                    geometricDifferences: '',
                    description: ''
                });
            }
            setOpenAccordion(null); // Close accordions after final selection
        } else {
            setShowDetailsCard(false);
            setDetailsData({
                updatedComponent: '',
                primaryReason: '',
                geometricDifferences: '',
                description: ''
            });
            toggleAccordion('team'); // Go back to team if upgrade is unselected
        }
    };

    // Filtered options for dropdowns
    const getRaceNames = () => {
        return [...new Set(upgradeData.map(item => item.RaceName))];
    };

    const getConstructors = () => {
        if (!selectedRaceName) return [];
        const filteredData = upgradeData.filter(item => item.RaceName === selectedRaceName);
        return [...new Set(filteredData.map(item => item.Constructor))];
    };

    const getUpdatedComponents = () => {
        if (!selectedRaceName || !selectedConstructor) return [];
        const filteredData = upgradeData.filter(
            item => item.RaceName === selectedRaceName && item.Constructor === selectedConstructor
        );
        return [...new Set(filteredData.map(item => item.UpdatedComponent))];
    };

    // --- In-memory Save/Remove Logic ---

    const handleSaveDetail = () => {
        if (!detailsData.updatedComponent) {
            showAlert("Please select an upgrade to save details.");
            return;
        }

        // Check for duplicates
        const isDuplicate = savedDetailsList.some(item =>
            item.raceName === selectedRaceName &&
            item.constructor === selectedConstructor &&
            item.updatedComponent === selectedUpdatedComponent
        );

        if (isDuplicate) {
            showAlert("This detail card is already saved!");
            return;
        }

        const newSavedItem = {
            id: Date.now(), // Simple unique ID
            ...detailsData,
            raceName: selectedRaceName,
            constructor: selectedConstructor,
            updatedComponent: selectedUpdatedComponent
        };

        setSavedDetailsList(prevList => [...prevList, newSavedItem]);
        showAlert("Detail saved successfully to app memory!");

        // Clear current selections after saving
        setSelectedRaceName('');
        setSelectedConstructor('');
        setSelectedUpdatedComponent('');
        setDetailsData({ updatedComponent: '', primaryReason: '', geometricDifferences: '', description: '' });
        setShowDetailsCard(false);
        setOpenAccordion(null); // Close all accordions
    };

    const handleRemoveSavedDetail = (id) => {
        const initialLength = savedDetailsList.length;
        setSavedDetailsList(prevList => prevList.filter(item => item.id !== id));
        if (savedDetailsList.length < initialLength) { // Check against the state *before* update
            showAlert("Detail card removed successfully!");
        } else {
            showAlert("Could not find detail card to remove.");
        }
    };

    // Function to handle clicking on a saved detail in the list
    const handleViewSavedDetail = (item) => {
        setDetailsData({
            updatedComponent: item.updatedComponent,
            primaryReason: item.primaryReason,
            geometricDifferences: item.geometricDifferences,
            description: item.description
        });
        setSelectedRaceName(item.raceName || '');
        setSelectedConstructor(item.constructor || '');
        setSelectedUpdatedComponent(item.updatedComponent || '');
        setShowDetailsCard(true);
        setShowSavedDetailsView(false); // Hide the list of saved details
        setOpenAccordion(null); // Close any open accordions
    };

    // Get current race details
    const currentRace = raceSchedule[currentRaceIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 font-inter text-gray-200">
            <div className="container mx-auto p-6 bg-gray-950/95 rounded-2xl shadow-xl max-w-5xl">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700/50">
                    <div className="p-2 rounded-lg bg-gray-800/90 border border-gray-700/50">
                        <span className="font-bold text-2xl text-blue-400 tracking-tight">RACE.APP</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowSavedDetailsView(true)}
                            className="p-2 rounded-lg bg-gray-800/90 border border-gray-700/50 hover:bg-gray-700/90 transition duration-300"
                        >
                            <span className="font-semibold text-lg text-amber-400">SAVED ({savedDetailsList.length})</span>
                        </button>
                    </div>
                </div>

                {/* Next Race Section */}
                <div className="mb-8 text-center md:text-left">
                    <p className="text-2xl text-gray-100 font-semibold">
                        Next Race: <span className="text-blue-400 font-bold">{currentRace.name}</span> In
                        <span className="text-red-400 font-bold"> {countdown.days}</span> days,
                        <span className="text-red-400 font-bold"> {countdown.hours}</span> hours,
                        <span className="text-red-400 font-bold"> {countdown.minutes}</span> minutes
                    </p>
                    <p className="text-lg text-gray-400 mt-1">
                        Circuit: <span className="font-medium">{currentRace.circuit}</span>
                    </p>
                </div>

                {/* Accordion Dropdowns Section */}
                {!showSavedDetailsView && (
                    <div className="mb-8 space-y-4">
                        {/* RaceName Accordion */}
                        <div>
                            <div
                                id="raceHeader"
                                ref={raceHeaderRef}
                                className="flex justify-between items-center p-4 cursor-pointer bg-gray-800/80 rounded-xl hover:bg-gray-700/80 transition duration-300"
                                onClick={() => toggleAccordion('race')}
                            >
                                <span className="text-lg font-semibold text-blue-300">Race Name</span>
                                <span className="text-lg text-gray-400">{openAccordion === 'race' ? '▲' : '▼'}</span>
                            </div>
                            <div className={`p-4 bg-gray-900/90 rounded-b-xl ${openAccordion === 'race' ? 'block' : 'hidden'}`}>
                                <select
                                    id="raceNameSelect"
                                    value={selectedRaceName}
                                    onChange={handleRaceNameChange}
                                    className="w-full bg-gray-800 text-gray-200 border border-gray-600/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                >
                                    <option value="" disabled>Select a Race Name</option>
                                    {getRaceNames().map((raceName) => (
                                        <option key={raceName} value={raceName}>{raceName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* TeamNames Accordion */}
                        {selectedRaceName && (
                            <div>
                                <div
                                    id="teamHeader"
                                    ref={teamHeaderRef}
                                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-800/80 rounded-xl hover:bg-gray-700/80 transition duration-300"
                                    onClick={() => toggleAccordion('team')}
                                >
                                    <span className="text-lg font-semibold text-blue-300">Team Name</span>
                                    <span className="text-lg text-gray-400">{openAccordion === 'team' ? '▲' : '▼'}</span>
                                </div>
                                <div className={`p-4 bg-gray-900/90 rounded-b-xl ${openAccordion === 'team' ? 'block' : 'hidden'}`}>
                                    <select
                                        id="teamNamesSelect"
                                        value={selectedConstructor}
                                        onChange={handleConstructorChange}
                                        className="w-full bg-gray-800 text-gray-200 border border-gray-600/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    >
                                        <option value="" disabled>Select a Team Name</option>
                                        {getConstructors().map((constructor) => (
                                            <option key={constructor} value={constructor}>{constructor}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* UpgradesName Accordion */}
                        {selectedConstructor && (
                            <div>
                                <div
                                    id="upgradesHeader"
                                    ref={upgradesHeaderRef}
                                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-800/80 rounded-xl hover:bg-gray-700/80 transition duration-300"
                                    onClick={() => toggleAccordion('upgrades')}
                                >
                                    <span className="text-lg font-semibold text-blue-300">Upgrade Name</span>
                                    <span className="text-lg text-gray-400">{openAccordion === 'upgrades' ? '▲' : '▼'}</span>
                                </div>
                                <div className={`p-4 bg-gray-900/90 rounded-b-xl ${openAccordion === 'upgrades' ? 'block' : 'hidden'}`}>
                                    <select
                                        id="upgradesNameSelect"
                                        value={selectedUpdatedComponent}
                                        onChange={handleUpdatedComponentChange}
                                        className="w-full bg-gray-800 text-gray-200 border border-gray-600/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    >
                                        <option value="" disabled>Select an Upgrade</option>
                                        {getUpdatedComponents().map((component) => (
                                            <option key={component} value={component}>{component}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Details and Spoilers Section */}
                {showDetailsCard && !showSavedDetailsView && (
                    <div className="mb-8">
                        <div className="relative bg-gray-800/90 border border-gray-700/50 p-6 rounded-2xl shadow-lg">
                            <h3 className="font-bold text-2xl mb-4 text-white">Details</h3>

                            {/* Spoilers Switch */}
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <span className="font-medium text-sm text-gray-300">Spoilers</span>
                                <label htmlFor="spoilerToggle" className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="spoilerToggle"
                                        className="sr-only peer"
                                        checked={spoilerOn}
                                        onChange={() => setSpoilerOn(!spoilerOn)}
                                    />
                                    <div className="w-10 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-300"><span className="font-semibold text-white">Part Name:</span> {detailsData.updatedComponent}</p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Reason for Upgrade:</span> {detailsData.primaryReason}</p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Geometric Differences:</span> {detailsData.geometricDifferences}</p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Description:</span> {detailsData.description}</p>
                            </div>

                            <button
                                onClick={handleSaveDetail}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                            >
                                Save Detail Card <span className="ml-2">✔</span>
                            </button>

                            {/* Spoiler Content */}
                            {spoilerOn && (
                                <div className="mt-6 bg-gray-900/90 border border-gray-700/50 p-4 rounded-xl">
                                    <p className="font-semibold text-lg text-red-400 mb-2">Best Qualifiers</p>
                                    <p className="font-bold text-xl text-red-500">Winner: Max Verstappen</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Saved Details View */}
                {showSavedDetailsView && (
                    <div className="bg-gray-800/90 border border-gray-700/50 p-6 rounded-2xl shadow-lg w-full">
                        <h3 className="font-bold text-2xl mb-6 text-white text-center">Your Saved Details</h3>
                        {savedDetailsList.length === 0 ? (
                            <p className="text-gray-400 text-center">No details saved yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {savedDetailsList.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-gray-700/80 border border-gray-600/50 p-4 rounded-xl hover:bg-gray-600/80 hover:scale-105 transition-all duration-200 relative"
                                    >
                                        <p className="font-semibold text-blue-300 text-lg mb-2" onClick={() => handleViewSavedDetail(item)}>{item.updatedComponent}</p>
                                        <p className="text-sm text-gray-300" onClick={() => handleViewSavedDetail(item)}>Race: {item.raceName}</p>
                                        <p className="text-sm text-gray-300" onClick={() => handleViewSavedDetail(item)}>Team: {item.constructor}</p>
                                        <p className="text-sm text-gray-400 mt-2 line-clamp-3" onClick={() => handleViewSavedDetail(item)}>{item.description}</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemoveSavedDetail(item.id); }}
                                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={() => setShowSavedDetailsView(false)}
                            className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 font-semibold mx-auto block"
                        >
                            Back to Main
                        </button>
                    </div>
                )}

                {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
            </div>
        </div>
    );
};

export default App;
