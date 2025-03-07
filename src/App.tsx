import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, HelpCircle, Sun, Moon, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am Leo Das, your AI assistant. Type 'help' to see what I can do! 😃",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText.trim().toLowerCase()),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('yo')) {
      return "Hare! Bhaiyaa vaanga vaanga!!! 😃\nEppadi irukinga? Nala irukingala? Tell me, how can I help you today?";
    } else if (input.includes('epdi iruka') || input.includes('how are you')) {
      return "Nala iruken da! 😎 But I'm more interested in how *you* are doing.\nNala irukiya? Konjam pesunga!";
    } else if (input.includes('hey yo yo puduchathu naan thaan')) {
      return "Hey hey muduchathu naan thaan sirutha! 😎🔥\nBut tell me something, what's your *real* talent? Dance? Singing? Something crazy?";
    } else if (input.includes('nee yaaru da')) {
      return "Naan thaan da Leo... Leo das..... RATATA RATATA 🔥🔥🔥\nBut beyond that, I'm your chatbot buddy! Here to talk, help, and maybe even roast you a little 😜";
    } else if (input.includes('dei sombu')) {
      return "Dei sombu illa da... Naan thaan da Leo.... 💥\nBut seriously, what's on your mind? Need help with something?";
    } else if (input.includes('whatsapp message')) {
      return "Sure! 😃 Just give me the number and the message, and I'll guide you through the process.\nBy the way, is this a serious message or just a random prank? 👀";
    } else if (input.includes('help') || input.includes('show commands') || input.includes('commands')) {
      return `📜 **LEO DAS - CHATBOT RULE MANUAL** 📜
👋 Welcome! I can chat, entertain, assist, and even roast you! 😆

**🗣️ BASIC CONVERSATION**
- hello / hi / hey / yo → Friendly greeting 😃
- epdi iruka / how are you? → Asks how you're doing
- nee yaaru da → Reveals my identity as Leo Das 🔥
- dei sombu → Funny response
- bye / goodbye / exit → Bids you farewell 👋

**📲 WHATSAPP HELP**
- i need to send a whatsapp message → Helps send a WhatsApp message
- how to send whatsapp message → Explains the process

**🎭 ENTERTAINMENT & FUN**
- tell me a joke / make me laugh → Shares a joke 😂
- roast me → Gives a savage roast 🔥
- sing a song → Sings a song 🎶
- hey yo yo puduchathu naan thaan → Fun response

**💡 INSPIRATION & LIFE TALKS**
- motivate me / inspire me → Gives motivational quotes 💪
- meaning of life / what's the purpose of life? → Deep thoughts 🤔

Try asking me something! 😃`;
    } else if (input.includes('joke') || input.includes('make me laugh')) {
      return "Sure! Here's a joke for you:\n**Why did the programmer break up with his girlfriend?**\nBecause she had too many *bugs*! 😆😂\nGot a better joke? Share it with me!";
    } else if (input.includes('roast me')) {
      return "Ohhh, you want a roast? Okay, here goes... 🔥🔥🔥\nBro, your WiFi speed is so slow, even a tortoise would outrun your downloads! 🐢📶\nTry me again, I got plenty more! 😆";
    } else if (input.includes('motivate') || input.includes('inspire')) {
      return "Of course! Here's some motivation for you:\n'Success is not about luck. It's about persistence, hard work, and *never* giving up.' 💪\nTell me, what's your biggest goal right now? Let's talk about it!";
    } else if (input.includes('meaning of life') || input.includes('purpose of life')) {
      return "Deep question! 🤔 Some say life is about happiness, some say it's about purpose.\nFor me, it's about making every conversation meaningful! 💡 What do *you* think?";
    } else if (input.includes('sing')) {
      return "Okay, okay! Here's a classic:\n🎶 'Why this kolaveri kolaveri kolaveri di? 🎶'\nJust kidding! What's your favorite song? Maybe I'll try singing that next time! 😆";
    } else if (input.includes('bye') || input.includes('goodbye') || input.includes('exit')) {
      return "Oh, you're leaving already? 😢\nAlright, take care! If you ever want to chat again, you know where to find me. Bye-bye! 👋";
    }
    return "Hmm... I'm not sure I understood that. 🤔\nBut hey, I'm still learning! Can you rephrase that or ask me something else?";
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: '0.1'
        }}></div>
      </div>

      {/* Main Container */}
      <div className="relative min-h-screen max-w-4xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 rounded-t-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leo Das</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <HelpCircle className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isDarkMode ? (
                <Sun className="text-gray-300" />
              ) : (
                <Moon className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} space-y-4`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} hover:bg-opacity-90`
                } transition-colors duration-200`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`rounded-2xl px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-b-2xl`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`flex-1 p-3 rounded-xl ${
                isDarkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`p-3 bg-blue-600 text-white rounded-xl transition-colors ${
                inputText.trim() ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-lg w-full rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 space-y-4`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Available Commands
            </h2>
            <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>• Say "hello" or "vanakkam" for a friendly greeting</p>
              <p>• Ask "epdi iruka?" to start a conversation</p>
              <p>• Try "tell me a joke" for some humor</p>
              <p>• Say "motivate me" for inspiration</p>
              <p>• Ask "nee yaaru da?" to know more about me</p>
              <p>• Try "sing a song" to hear me sing</p>
              <p>• Say "roast me" if you're feeling brave</p>
              <p>• Use "help" to see this list again</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mt-4"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;