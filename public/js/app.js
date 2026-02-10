import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { NLPEngine } from './nlp.js';

createApp({
    setup() {
        const engine = new NLPEngine();
        
        const jobDescription = ref("Senior Data Scientist\n\nMust have experience with Python, Machine Learning, and SQL. Knowledge of AWS and Deep Learning is preferred.");
        const resumeText = ref("I am a software engineer with skills in Python and SQL. I love coding.");
        
        // Computed Properties automatically update when text changes
        const similarityScore = computed(() => {
            const score = engine.calculateSimilarity(jobDescription.value, resumeText.value);
            return (score * 100).toFixed(1); // Convert to percentage
        });

        const missingKeywords = computed(() => {
            return engine.getMissingKeywords(jobDescription.value, resumeText.value);
        });

        const scoreColor = computed(() => {
            const s = parseFloat(similarityScore.value);
            if (s > 75) return '#4ade80'; // Green
            if (s > 50) return '#fbbf24'; // Yellow
            return '#f87171'; // Red
        });

        return {
            jobDescription, 
            resumeText, 
            similarityScore, 
            missingKeywords,
            scoreColor
        };
    }
}).mount('#app');