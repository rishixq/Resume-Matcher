export class NLPEngine {
    constructor() {
        // A small hardcoded list of "Stop Words" (common words to ignore)
        this.stopWords = new Set([
            "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", 
            "in", "on", "at", "to", "for", "of", "with", "by", "from", "up", 
            "about", "into", "over", "after", "i", "you", "he", "she", "we", 
            "they", "it", "my", "your", "their", "this", "that", "these", "those"
        ]);
    }

    // 1. Clean and Tokenize Text
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .split(/\s+/)            // Split by whitespace
            .filter(word => word.length > 2 && !this.stopWords.has(word)); // Remove stop words
    }

    // 2. Create Frequency Map (Bag of Words)
    getFrequency(tokens) {
        const freq = {};
        tokens.forEach(word => {
            freq[word] = (freq[word] || 0) + 1;
        });
        return freq;
    }

    // 3. The Core Algorithm: Cosine Similarity
    calculateSimilarity(textA, textB) {
        const tokensA = this.tokenize(textA);
        const tokensB = this.tokenize(textB);

        // Get unique words from both texts combined
        const vocabulary = new Set([...tokensA, ...tokensB]);
        
        const vecA = this.getFrequency(tokensA);
        const vecB = this.getFrequency(tokensB);

        let dotProduct = 0;
        let magA = 0;
        let magB = 0;

        vocabulary.forEach(word => {
            const valA = vecA[word] || 0;
            const valB = vecB[word] || 0;

            dotProduct += valA * valB;
            magA += valA * valA;
            magB += valB * valB;
        });

        magA = Math.sqrt(magA);
        magB = Math.sqrt(magB);

        if (magA === 0 || magB === 0) return 0;

        // Similarity = (A . B) / (||A|| * ||B||)
        return (dotProduct / (magA * magB));
    }

    // 4. Extract Missing Keywords (Gap Analysis)
    getMissingKeywords(jobDesc, resume) {
        const jobTokens = this.tokenize(jobDesc);
        const resumeTokens = new Set(this.tokenize(resume));
        
        const freq = this.getFrequency(jobTokens);
        
        // Return words that are in Job Desc but NOT in Resume, sorted by frequency
        return Object.keys(freq)
            .filter(word => !resumeTokens.has(word))
            .sort((a, b) => freq[b] - freq[a]) // High frequency first
            .slice(0, 10); // Top 10 missing
    }
}