import gsap from "gsap";

// Add energy particles styles to document
export const addEnergyParticlesStyles = () => {
  // Check if styles are already added to avoid duplicates
  if (document.getElementById("energy-particles-styles")) return;

  const styleElement = document.createElement("style");
  styleElement.id = "energy-particles-styles";
  styleElement.textContent = `
    .energy-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .energy-particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      filter: blur(1px);
      box-shadow: 0 0 10px rgba(0, 150, 255, 0.7);
      pointer-events: none;
    }
  `;
  document.head.appendChild(styleElement);
};

// Helper function to apply the animation to a specific element
const applyVerticalTextAnimation = (element) => {
  // Get elements - account for different class naming between pages
  const line =
    element.querySelector(".line") || element.querySelector(".vertical-line");
  const leftText = element.querySelector(".left-text");
  const primaryText = element.querySelector(".large-text-primary");
  const secondaryText = element.querySelector(".large-text-secondary");

  if (!line) return;

  // Create particles container
  const particleContainer = document.createElement("div");
  particleContainer.className = "energy-particles";
  line.appendChild(particleContainer);

  // Create particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "energy-particle";
    particleContainer.appendChild(particle);

    gsap.set(particle, {
      y: Math.random() * line.offsetHeight,
      opacity: 0,
      scale: 0,
    });
  }

  // Set initial states
  gsap.set(line, {
    scaleY: 0,
    transformOrigin: "top center",
    boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
  });

  const textElements = [];
  if (leftText) {
    textElements.push(leftText);
    gsap.set(leftText, { opacity: 0, y: 40, filter: "blur(10px)" });
  }

  if (primaryText) {
    textElements.push(primaryText);
    gsap.set(primaryText, { opacity: 0, y: 40, filter: "blur(10px)" });
  }

  if (secondaryText) {
    textElements.push(secondaryText);
    gsap.set(secondaryText, { opacity: 0, y: 40, filter: "blur(10px)" });
  }

  // Create timeline for the animation
  const tl = gsap.timeline();

  // Extra noticeable animation
  tl.to(line, {
    scaleY: 1,
    duration: 1,
    ease: "power3.inOut",
    boxShadow:
      "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(0, 150, 255, 0.6)",
    onStart: () => {
      // Animate particles along the line
      const particles = element.querySelectorAll(".energy-particle");
      particles.forEach((particle, i) => {
        // Delayed appearance
        gsap.to(particle, {
          opacity: Math.random() * 0.7 + 0.3,
          scale: Math.random() * 0.6 + 0.4,
          duration: 0.4,
          delay: 0.1 + i * 0.05,
        });

        // Upward floating movement
        gsap.to(particle, {
          y: "-=" + (Math.random() * 120 + 80),
          repeat: -1,
          duration: Math.random() * 3 + 2,
          ease: "sine.inOut",
          yoyo: true,
        });

        // Pulsing effect
        gsap.to(particle, {
          boxShadow: "0 0 15px rgba(0, 150, 255, 0.8)",
          repeat: -1,
          duration: Math.random() * 2 + 1,
          ease: "sine.inOut",
          yoyo: true,
        });
      });
    },
  });

  if (leftText) {
    tl.to(
      leftText,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "back.out(1.7)",
        textShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
      },
      "-=0.5"
    );
  }

  if (primaryText) {
    tl.to(
      primaryText,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        textShadow: "0 0 12px rgba(0, 150, 255, 0.7)",
        ease: "back.out(1.7)",
      },
      "-=0.6"
    );
  }

  if (secondaryText) {
    tl.to(
      secondaryText,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        textShadow: "0 0 12px rgba(0, 150, 255, 0.7)",
        ease: "back.out(1.7)",
        onComplete: () => {
          if (primaryText && secondaryText) {
            gsap.to([primaryText, secondaryText], {
              y: "+=8", // Extra movement for visibility
              duration: 2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }

          // Enhanced glow pulse for the line
          gsap.to(line, {
            boxShadow:
              "0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(0, 150, 255, 0.8)",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      },
      "-=0.6"
    );
  }

  return tl;
};

// Enhanced animation specifically for the Home page
export const setupHomeVerticalTextAnimation = () => {
  // Find home page vertical text elements
  const verticalText = document.querySelector(".vertical-text.right");

  if (!verticalText) return;

  // Get elements
  const line = verticalText.querySelector(".vertical-line");
  const leftText = verticalText.querySelector(".left-text");
  const primaryText = verticalText.querySelector(".large-text-primary");
  const secondaryText = verticalText.querySelector(".large-text-secondary");

  if (!line) return;

  // Create energy particles for the line
  const particleContainer = document.createElement("div");
  particleContainer.className = "energy-particles";
  line.appendChild(particleContainer);

  // Create particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "energy-particle";
    particleContainer.appendChild(particle);

    // Random initial position along the line
    gsap.set(particle, {
      y: Math.random() * line.offsetHeight,
      x: Math.random() * 6 - 3,
      opacity: 0,
      scale: 0,
    });
  }

  // Set initial states
  gsap.set(line, {
    scaleY: 0,
    transformOrigin: "top center",
    boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
  });

  const textElements = [];
  if (leftText) {
    textElements.push(leftText);
    gsap.set(leftText, { opacity: 0, scale: 0.8, y: 80, filter: "blur(20px)" });
  }

  if (primaryText) {
    textElements.push(primaryText);
    gsap.set(primaryText, {
      opacity: 0,
      scale: 0.8,
      y: 80,
      filter: "blur(20px)",
    });
  }

  if (secondaryText) {
    textElements.push(secondaryText);
    gsap.set(secondaryText, {
      opacity: 0,
      scale: 0.8,
      y: 80,
      filter: "blur(20px)",
    });
  }

  // Create dramatic timeline
  const tl = gsap.timeline();

  // Line animation with energy effect
  tl.to(line, {
    scaleY: 1,
    duration: 1.2,
    ease: "power3.inOut",
    boxShadow:
      "0 0 25px rgba(255, 255, 255, 0.9), 0 0 50px rgba(0, 150, 255, 0.7)",
    onStart: () => {
      // Animate particles along the line
      const particles = verticalText.querySelectorAll(".energy-particle");
      particles.forEach((particle, i) => {
        // Delayed appearance
        gsap.to(particle, {
          opacity: Math.random() * 0.7 + 0.3,
          scale: Math.random() * 0.7 + 0.5,
          duration: 0.4,
          delay: 0.1 + i * 0.05,
        });

        // Upward floating movement
        gsap.to(particle, {
          y: "-=" + (Math.random() * 150 + 100),
          repeat: -1,
          duration: Math.random() * 3 + 2,
          ease: "sine.inOut",
          yoyo: true,
        });

        // Pulsing effect
        gsap.to(particle, {
          boxShadow: "0 0 20px rgba(0, 150, 255, 1)",
          repeat: -1,
          duration: Math.random() * 2 + 1,
          ease: "sine.inOut",
          yoyo: true,
        });
      });
    },
  });

  // Left text with dramatic reveal
  if (leftText) {
    tl.to(
      leftText,
      {
        opacity: 1,
        scale: 1.1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "back.out(1.7)",
        textShadow: "0 0 15px rgba(255, 255, 255, 1)",
      },
      "-=0.7"
    ).to(leftText, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  // Primary text with holographic effect
  if (primaryText) {
    tl.to(
      primaryText,
      {
        opacity: 1,
        scale: 1.2,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        textShadow: "0 0 15px rgba(0, 150, 255, 0.7)",
      },
      "-=0.6"
    ).to(primaryText, {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
    });
  }

  // Secondary text with dramatic scale
  if (secondaryText) {
    tl.to(secondaryText, {
      opacity: 1,
      scale: 1.2,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "back.out(1.7)",
      textShadow: "0 0 15px rgba(0, 150, 255, 0.7)",
      onComplete: () => {
        // Create floating animation
        gsap.to([primaryText, secondaryText].filter(Boolean), {
          y: "+=10",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Intense glow pulse for the line
        gsap.to(line, {
          boxShadow:
            "0 0 30px rgba(255, 255, 255, 0.9), 0 0 50px rgba(0, 150, 255, 0.7)",
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
    }).to(secondaryText, {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
    });
  }

  return tl;
};

// Add this function to your animations.js file for specifically targeting projects page
export const setupProjectsVerticalTextAnimation = () => {
  // Try different selectors that might be used on the Projects page
  const projectsVerticalText =
    document.querySelector(".projects-container .vertical-text") ||
    document.querySelector(".projects-page .vertical-text") ||
    document.querySelector("..project-list-page .vertical-text-left") ||
    document.querySelector("#projects .vertical-text");

  if (!projectsVerticalText) {
    console.log(
      "Projects vertical text element not found, checking for any remaining vertical text elements"
    );
    // As a fallback, look for any vertical text elements that might not have been animated yet
    const allVerticalTexts = document.querySelectorAll(".vertical-text");
    allVerticalTexts.forEach((element) => {
      // Check if this element has already been animated
      if (!element.classList.contains("animated")) {
        applyVerticalTextAnimation(element);
        element.classList.add("animated");
      }
    });
    return;
  }

  applyVerticalTextAnimation(projectsVerticalText);
  projectsVerticalText.classList.add("animated");
};

// Setup for all vertical text animations
export const setupVerticalTextAnimations = () => {
  // Find all vertical text elements across the site (except home which has its own)
  const verticalTextElements = document.querySelectorAll(
    ".vertical-text:not(.right), .vertical-text-about, .vertical-text.left"
  );

  verticalTextElements.forEach((element) => {
    // Skip elements that have already been animated
    if (element.classList.contains("animated")) return;

    // Apply animation and mark as animated
    applyVerticalTextAnimation(element);
    element.classList.add("animated");
  });
};

// Add this new function to trigger animations after transitions
export const triggerAnimationsAfterTransition = () => {
  console.log("Triggering animations after transition");

  // Create and dispatch a custom event
  const event = new CustomEvent("setupAnimations");
  document.dispatchEvent(event);

  // Also call the setup functions directly
  addEnergyParticlesStyles(); // Ensure styles are added

  // Look for vertical text elements that need animation
  const homeVerticalText = document.querySelector(".vertical-text.right");
  if (homeVerticalText) {
    setupHomeVerticalTextAnimation(homeVerticalText);
  }

  // Check for other pages
  const projectsVerticalText = document.querySelector(
    ".projects-container .vertical-text"
  );
  if (projectsVerticalText) {
    setupProjectsVerticalTextAnimation();
  }

  // General setup for any remaining vertical texts
  setupVerticalTextAnimations();
};
