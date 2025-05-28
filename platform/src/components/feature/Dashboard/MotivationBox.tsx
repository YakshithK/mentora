
import React, { useEffect, useState } from "react";
import { Quote, Sparkles } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

const MotivationBox = () => {
  const [quote, setQuote] = useState("The only way to do great work is to love what you do.");
  const [author, setAuthor] = useState("Steve Jobs");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (error) {
      setQuote("The only way to do great work is to love what you do.");
      setAuthor("Steve Jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 w-full hover:shadow-sm transition-all duration-300 relative pb-16">
      <div className="mb-6">
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
          <Quote className="w-6 h-6 text-purple-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Motivation</h3>
        
        {loading ? (
          <Spinner />
        ) : (
          <>
            <blockquote className="text-base text-gray-700 leading-relaxed mb-4 font-medium italic">
              "{quote}"
            </blockquote>
            <p className="text-sm text-purple-600 font-medium">— {author}</p>
          </>
        )}
      </div>
      
      <button
        onClick={fetchQuote}
        disabled={loading}
        className="absolute bottom-8 left-8 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        {loading ? "Loading..." : "New Quote"}
      </button>
    </div>
  );
};

export default MotivationBox;