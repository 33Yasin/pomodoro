import React, { useEffect, useState } from 'react';

function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend API'den alıntıyı çek
    fetch('http://localhost:4000/api/quote')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading quote...</p>;
  if (!quote) return <p>No quote found</p>;

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-blue-100 italic">
      <p>"{quote.text}"</p>
      <p className="text-right mt-2">— {quote.author}</p>
    </div>
  );
}

export default Quote;
