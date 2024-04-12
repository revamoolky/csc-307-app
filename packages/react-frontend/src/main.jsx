// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";9
import "./main.css";
import MyApp from "./MyApp";


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render("<MyApp />");