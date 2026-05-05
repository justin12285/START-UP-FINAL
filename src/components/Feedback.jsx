import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { saveFeedback } from '../services/firestore';

export default function Feedback({ routeId }) {
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [isHelpful, setIsHelpful] = useState(null);

  const handleFeedback = async (helpful) => {
    setIsHelpful(helpful);
    // Don't auto-submit if they want to leave a comment, but for MVP we submit immediately or wait
    // We'll show the comment field after they click yes/no.
  };

  const submitFinal = async () => {
    if (isHelpful === null) return;
    await saveFeedback(routeId, isHelpful, comment);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-gray-800/30 border border-green-500/20 p-4 rounded-2xl text-center animate-in fade-in zoom-in-95">
        <p className="text-green-400 font-medium">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-gray-800 rounded-3xl p-5 shadow-xl">
      <h3 className="text-white font-semibold mb-4 text-center">Was this route helpful?</h3>
      
      {isHelpful === null ? (
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => handleFeedback(true)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors flex-1 border border-gray-700"
          >
            <ThumbsUp className="w-8 h-8 text-secondary" />
            <span className="text-sm text-gray-300 font-medium">Yes</span>
          </button>
          <button 
            onClick={() => handleFeedback(false)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors flex-1 border border-gray-700"
          >
            <ThumbsDown className="w-8 h-8 text-red-500" />
            <span className="text-sm text-gray-300 font-medium">No</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </div>
            <textarea
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none h-24"
              placeholder="Any additional comments? (Optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button 
            onClick={submitFinal}
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}
