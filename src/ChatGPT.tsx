import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatGPTResponse {
  content: string;
}

const ChatGPT: React.FC = () => {
  const [response, setResponse] = useState<ChatGPTResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChatGPTData = async () => {
      try {
        const result = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: [{ role: 'user', content: 'Hello, ChatGPT!' }],
          },
          {
            headers: {
              Authorization: `Bearer YOUR_API_KEY`,
            },
          }
        );
        setResponse(result.data.choices[0].message);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchChatGPTData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>ChatGPT Response</h2>
      {response && <p>{response.content}</p>}
    </div>
  );
};

export default ChatGPT;
