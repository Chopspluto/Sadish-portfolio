import projectOnemain from '../assets/project1-image1.webp';
import projectOnearch from '../assets/project1-image2.webp';
import projectTwomain from '../assets/project2-image1.webp';
import projectTwoarch from '../assets/project2-image2.webp';
import projectThreemain from '../assets/project3-image1.webp';
import projectThreearch from '../assets/project3-image2.webp';

import projectOnePdf from './Dirvonx.pdf';
import projectTwoPdf from './IFPP.pdf';
import projectThreePdf from './AFSD.pdf';

export const PROJECTS = [
  {
    id: 1,
    title: "DIRVONX",
    subtitle: "AI-Powered Intelligent Aviation Assistant Application",
    cardImage: projectOnemain,
    description: "An Offline AI Aviation Assistant for Intelligent Knowledge Retrieval, Flight Planning, Operational Decision Support, and Aviation Calculations",
    detailedDescription: "DIRVONX (Direct Intelligent Response for Aviation Operations and Navigation Excellence) is an AI-powered desktop aviation assistant developed to provide aviation professionals with immediate access to reliable aviation knowledge without requiring an internet connection." + 
    "Unlike generic AI assistants, DIRVONX is built specifically for aviation, allowing pilots, aerospace engineers, maintenance technicians, aviation students, ground staff, and air traffic controllers to retrieve highly accurate information using natural language." +
    "The application combines Retrieval-Augmented Generation (RAG) with a large aviation knowledge base derived primarily from the FAA Pilot's Handbook of Aeronautical Knowledge and other official aviation publications. Every answer includes citations so users can verify the source material.",
    pdfUrl: projectOnePdf,
    specsTitle: "Performance Metrics",
    specs: [
      { label: "RESPONSE TIME", value: "1.7 seconds" },
      { label: "Query Accuracy", value: "92%" },
      { label: "NOTAM Accuracy", value: "93.3%" },
      { label: "Calculator Accuracy", value: "100%" },
      { label: "Knowledge Base", value: "3,832 indexed sections" },
      { label: "Memory Usage", value: "2–4 GB" },
      { label: "Offline Capability", value: "100% Local Processing" }
    ],
    gallery: [
      projectOnemain,
      projectOnearch
    ]
  },
  {
    id: 2,
    title: "Intelligent Flight Path Planner (IFPP)",
    subtitle: "AI Integration into Flight Planning",
    cardImage: projectTwomain,
    description: "An AI-Assisted Web-Based Flight Management System for Route Optimization, Weather-Aware Decision Support, and Aircraft Performance Analysis",
    detailedDescription: "The Intelligent Flight Path Planner (IFPP) is an AI-assisted web application developed to improve pre-flight planning through intelligent route optimization, aircraft performance validation, and real-time weather integration." + 
    "The project was created as an educational simulation of a modern Flight Management System (FMS). Instead of replacing certified cockpit avionics, IFPP provides pilots, aviation students, and flight dispatchers with an accessible platform capable of generating optimized flight routes from Dubai International Airport (DXB) to several international destinations." +
    "The application combines aviation engineering principles with modern web technologies by integrating aircraft performance databases, live meteorological information, airport data, and AI-assisted routing logic. Users simply choose an aircraft type and destination airport, after which the system determines whether the aircraft can safely complete the mission while considering weather conditions and operational constraints." +
    "Unlike conventional flight planners that require expensive subscriptions or dedicated avionics hardware, IFPP demonstrates that intelligent flight planning can be achieved using open-source software, public aviation APIs, and modern web development frameworks.",
    pdfUrl: projectTwoPdf,
    specsTitle: "Performance Metrics",
    specs: [
      { label: "Average Route Generation", value: "~1.5 seconds" },
      { label: "API Response", value: "300–800 ms" },
      { label: "Weather Overlay Rendering", value: "~1.2 seconds" },
      { label: "Deployment", value: "Local Flask Server" },
      { label: "Platform", value: "Browser-based" }
    ],
    gallery: [
      projectTwomain,
      projectTwoarch
    ]
  },
  {
    id: 3,
    title: "Automated Fertilizer Drone",
    subtitle: "Design of the Reservoir and Nozzle System for the Automated Fertilizer Spraying Drone",
    cardImage: projectThreemain,
    description: "Design and Optimization of a Lightweight Fertilizer Storage and Precision Spraying System for an Autonomous Agricultural Drone",
    detailedDescription: "This project focuses on the engineering design and optimization of two critical subsystems of an autonomous fertilizer spraying drone: the fertilizer reservoir and the precision nozzle system." +
    "The primary objective was to create a lightweight, durable, and chemically resistant spraying mechanism capable of distributing liquid fertilizer accurately across agricultural fields while maintaining the drone's flight stability, payload limitations, and operational efficiency." +
    "The project was undertaken as part of a larger agricultural automation system intended to improve precision farming by replacing traditional manual fertilizer application methods. Using GPS-guided autonomous flight, the drone follows predefined routes while dynamically adjusting spray characteristics to ensure uniform fertilizer distribution and reduce chemical wastage.",
    pdfUrl: projectThreePdf,
    specsTitle: "Reservoir Specifications",
    specs: [
      { label: "Reservoir Type", value: "Horizontal Cylindrical Tank" },
      { label: "Capacity", value: "10 Litres (target design)" },
      { label: "Prototype Estimate", value: "1 L (testing reference)" },
      { label: "Material", value: "High-Density Polyethylene (HDPE)" },
      { label: "Wall Thickness", value: "4 mm" },
      { label: "Chemical Resistance", value: "High" },
      { label: "UV Resistance", value: "Yes" },
      { label: "Corrosion Resistant", value: "Yes" },
      { label: "Lightweight Construction", value: "Yes" }
    ],
    gallery: [
      projectThreemain,
      projectThreearch
    ]
  }
];