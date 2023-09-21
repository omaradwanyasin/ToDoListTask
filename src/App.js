import React, { useState, useEffect } from "react";
export default function App() {
  const [name, setName] = useState(0);
  const [mobile, setMobile] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  let dependency = { name, mobile };

  // here is the problem react takes an array of dependency and this is an object , so this will be treted as obejct
  //and change of the object will lead to rerender of all the app  because React doesn't perform a deep comparison of object properties.
  useEffect(() => {
    console.log("UseEffect is called");
  }, [name, mobile]);
  return (
    <div className={`container ${darkMode ? "bgDark" : "bgLight"}`}>
      <input
        type="text"
        id="name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="mobile"
        placeholder="Mobile"
        onChange={(e) => setMobile(e.target.value)}
      />
      <div className="darkmode">
        <input
          type="checkbox"
          id="darkMode"
          onChange={() => setDarkMode(!darkMode)}
        />
        Enable dark mode
      </div>
    </div>
  );
}
