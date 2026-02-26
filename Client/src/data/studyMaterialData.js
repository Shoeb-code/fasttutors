import { chapterMap } from "../constants/academicStructure.js";

/* =========================================================
   🔥 GENERATE CHAPTERS FROM chapterMap
========================================================= */

const generateChapters = (classKey, subjectKey, materials = {}) => {

  const chapters = chapterMap?.[classKey]?.[subjectKey];

  if (!chapters) return [];

  return chapters.map((chapterName) => ({
    title: chapterName,
    materials: materials[chapterName] || [],
  }));
};

/* =========================================================
   📚 STUDY MATERIAL DATA
========================================================= */

export const studyMaterialData = {

  /* =========================================================
     CLASS 6
  ========================================================= */

  "class-6": {

    science: {
      description:
        "Basic scientific concepts covering physics, chemistry and biology.",

      chapters: generateChapters("class-6","science",{

        "Food: Where Does It Come From":[
          { title:"Nutrition Notes", type:"notes" },
          { title:"Science Activity PDF", type:"pdf" },
        ],

        "Getting to Know Plants":[
          { title:"Plant Diagram Notes", type:"notes" },
          { title:"Plant Functions Video", type:"video" },
        ],

      }),
    },

    maths: {
      description:
        "Numbers, fractions, decimals and basic geometry.",

      chapters: generateChapters("class-6","maths",{

        "Knowing Our Numbers":[
          { title:"Basic Numbers Notes", type:"notes" },
          { title:"Practice Sheet", type:"pdf" },
        ],

        "Fractions":[
          { title:"Fractions Explained", type:"video" },
          { title:"Fractions Worksheet", type:"pdf" },
        ],

      }),
    },

  },

  /* =========================================================
     CLASS 8
  ========================================================= */

  "class-8": {

    maths: {
      description:
        "Algebraic expressions, linear equations and geometry.",

      chapters: generateChapters("class-8","maths",{

        "Linear Equations":[
          { title:"Equation Notes", type:"notes" },
          { title:"Equation Video", type:"video" },
        ],

        "Mensuration":[
          { title:"Area & Volume PDF", type:"pdf" },
        ],

      }),
    },

    science: {
      description:
        "General science concepts.",

      chapters: generateChapters("class-8","science",{

        "Force and Pressure":[
          { title:"Force Notes", type:"notes" },
          { title:"Pressure Demo Video", type:"video" },
        ],

      }),
    },

  },

  /* =========================================================
     CLASS 10
  ========================================================= */

  "class-10": {

    physics: {
      description:
        "Electricity, magnetism and light concepts.",

      chapters: generateChapters("class-10","physics",{

        "Electricity":[
          { title:"Electricity Notes", type:"notes" },
          { title:"Circuit Diagram PDF", type:"pdf" },
          { title:"Lecture Video", type:"video" },
        ],

      }),
    },

    chemistry: {
      description:
        "Chemical reactions, acids, bases and metals.",

      chapters: generateChapters("class-10","chemistry",{

        "Chemical Reactions":[
          { title:"Reaction Notes", type:"notes" },
          { title:"Lab Demo Video", type:"video" },
        ],

      }),
    },

    biology: {
      description:
        "Life processes, heredity and evolution.",

      chapters: generateChapters("class-10","biology",{

        "Life Processes":[
          { title:"Life Process Notes", type:"notes" },
          { title:"Animation Video", type:"video" },
        ],

      }),
    },

    maths: {
      description:
        "Trigonometry, coordinate geometry and statistics.",

      chapters: generateChapters("class-10","maths",{

        "Real Numbers":[
          { title:"Notes", type:"notes" },
          { title:"Practice PDF", type:"pdf" },
        ],

        "Polynomials":[
          { title:"Polynomial Notes", type:"notes" },
          { title:"Practice PDF", type:"pdf" },
        ],

        "Quadratic Equations":[
          { title:"Quadratic Notes", type:"notes" },
          { title:"Practice PDF", type:"pdf" },
        ],

      }),
    },

  },

  /* =========================================================
     CLASS 12
  ========================================================= */

  "class-12": {

    physics: {
      description:
        "Electrostatics, optics and modern physics.",

      chapters: generateChapters("class-12","physics",{

        "Electric Charges and Fields":[
          { title:"Electrostatics Notes", type:"notes" },
          { title:"Numerical Video", type:"video" },
        ],

      }),
    },

    chemistry: {
      description:
        "Organic chemistry and electrochemistry.",

      chapters: generateChapters("class-12","chemistry",{

        "Haloalkanes and Haloarenes":[
          { title:"Reaction Mechanism Notes", type:"notes" },
          { title:"Organic PDF", type:"pdf" },
        ],

      }),
    },

    biology: {
      description:
        "Genetics, biotechnology and ecology.",

      chapters: generateChapters("class-12","biology",{

        "Molecular Basis of Inheritance":[
          { title:"DNA Structure Notes", type:"notes" },
          { title:"Genetics Animation", type:"video" },
        ],

      }),
    },

    maths: {
      description:
        "Calculus, matrices and probability.",

      chapters: generateChapters("class-12","maths",{

        "Continuity & Differentiability":[
          { title:"Calculus Notes", type:"notes" },
          { title:"Derivative Video", type:"video" },
        ],

      }),
    },

  },

};
