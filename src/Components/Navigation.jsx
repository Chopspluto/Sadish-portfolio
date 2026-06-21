import React from 'react'

function Navigation({activeSection}) {

    console.log("ACTIVE:", activeSection);

    const sections = [
        "home",
        "projects",
        "about"
    ];

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });
    };
  return (
    <>
    <div className='nav-rail-left animate-entry delay-2'>
        {sections.map((section) => (
            <button
            key={section}
            className={`nav-line ${
                activeSection === section ? "active" : "" }`}
                onClick={() => scrollToSection(section)}
                aria-label={section}/>
        ))}
    </div>
    <div className='nav-rail-right animate-entry delay-3'>
        {sections.map((section) => (
            <button
            key={section}
            className={`nav-line ${
                activeSection === section ? "active" : "" }`}
                onClick={() => scrollToSection(section)}
                aria-label={section} />
        ))}
    </div>
    </>
  )
}

export default Navigation