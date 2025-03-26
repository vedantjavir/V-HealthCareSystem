import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import clsx from 'clsx';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const generateBotResponse = (userMessage: string): string => {
  const normalizedMessage = userMessage.toLowerCase();
  
  if (normalizedMessage.includes('headache')) {
    return "Based on your symptoms, here are some recommendations:\n1. Rest in a quiet, dark room\n2. Stay hydrated\n3. Try over-the-counter pain relievers\n4. If symptoms persist for more than 24 hours, please consult a healthcare provider.";
  }
  
  if (normalizedMessage.includes('exercise') || normalizedMessage.includes('workout')) {
    return "Here are some general exercise guidelines:\n1. Aim for 150 minutes of moderate activity per week\n2. Include both cardio and strength training\n3. Start slowly and gradually increase intensity\n4. Always warm up and cool down\n5. Stay hydrated during workouts";
  }
  
  if (normalizedMessage.includes('diet') || normalizedMessage.includes('nutrition')) {
    return "For a healthy diet, consider these tips:\n1. Eat plenty of fruits and vegetables\n2. Choose whole grains over refined grains\n3. Include lean proteins\n4. Limit processed foods and added sugars\n5. Stay hydrated with water";
  }
  
  if (normalizedMessage.includes('sleep')) {
    return "To improve sleep quality:\n1. Maintain a consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Avoid screens before bed\n4. Keep your bedroom cool and dark\n5. Aim for 7-9 hours of sleep per night";
  }

  return "I'm here to help with your health-related questions. You can ask about:\n- Symptoms and treatments\n- Exercise recommendations\n- Diet and nutrition\n- Sleep hygiene\n- General health advice";
};

export const HealthcareBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateBotResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">AI Health Assistant</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={clsx(
              'flex',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={clsx(
                'max-w-[80%] rounded-lg p-3',
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              )}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health-related question..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};