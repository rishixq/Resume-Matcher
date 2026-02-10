# 📄 NLP Resume Matcher AI

A browser-based **Natural Language Processing (NLP)** engine that analyzes the semantic similarity between Job Descriptions (JD) and Resumes in real-time. 

> **Key Feature:** Built entirely from scratch using **Vanilla JavaScript** and **linear algebra**, without reliance on external ML libraries like Python's `scikit-learn` or `NLTK`.

![Project Screenshot](screenshot.png)
*(Place your screenshot here)*

---

## 🚀 Project Overview

This tool simulates an **Applicant Tracking System (ATS)**. It breaks down text into high-dimensional vectors and calculates the cosine angle between them to determine relevance. It helps users identify "Keyword Gaps"—critical domain-specific terms missing from their resume.

### **The "Zero-Dependency" Challenge**
This project was engineered within a strict corporate environment where **external package installations (pip/npm) were restricted**. 
* **Constraint:** No Python, No Machine Learning libraries, No Server-side processing.
* **Solution:** I implemented the core mathematical algorithms (Tokenization, Vectorization, Cosine Similarity) natively in JavaScript to run 100% client-side.

---

## 🧠 The Data Science (Under the Hood)

Instead of using a "black box" API, this project implements **Vector Space Modeling** from first principles.

### 1. Tokenization & Cleaning
Raw text is processed through a custom pipeline:
* **RegEx Sanitization:** Removes punctuation and special characters (`/[^\w\s]/g`).
* **Stop Word Removal:** Filters out high-frequency, low-value words (e.g., "the", "and", "is") using a custom `Set` for O(1) lookups.

### 2. Vectorization (Bag of Words)
The text is converted into a Frequency Map (Vector), where each unique word represents a dimension in vector space.

### 3. Cosine Similarity Algorithm
The relevance score is calculated by measuring the cosine of the angle between the Job Vector ($\mathbf{A}$) and Resume Vector ($\mathbf{B}$).

$$ \text{similarity} = \cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A