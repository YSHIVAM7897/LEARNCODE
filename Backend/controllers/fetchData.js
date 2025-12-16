import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import fs from "fs"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read all supported languages once
const allLanguages = JSON.parse(
  fs.readFileSync(join(__dirname, "../data/SupportLang.json"), "utf8")
);

// Fetch all languages
export const fetchAllLanguages = async (req, res) => {
  try {
    res.status(200).json(allLanguages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching languages" });
  }
};

// Fetch a specific language by slug   (like index page of books) 
export const fetchLanguageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const language = JSON.parse(
      fs.readFileSync(join(__dirname, `../Data/${slug}.json`), "utf8")
    );

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: `Error fetching language data: ${error}` });
  }
};

// Fetch only modules of a specific language 
export const fetchLanguageModules = async (req, res) => {
  try {
    const { slug, module } = req.params;

    const filePath = join(__dirname, `../HTMLContent/${slug}/${module}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Module not found" });
    }
 
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const language = JSON.parse(fileContent); 

    res.status(200).json(language); 
  } catch (error) {
    res.status(500).json({ message: `Error fetching modules: ${error}` });
  }
};


export const fetchQuizData = async (req, res) => {
  try {
    const { slug } = req.params; 
    const filePath = join(__dirname, `../Quiz/${slug}.json`); 
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Quiz data not found" });
    }   

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const quizData = JSON.parse(fileContent);
    res.status(200).json(quizData);
  } catch (error) {
    res.status(500).json({ message: `Error fetching quiz data: ${error}` });
  }
}

