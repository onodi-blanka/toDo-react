import { useState } from 'react';

const SendingSimpleMsg: React.FC = () => {
  const [messages, setMessages] = useState<string>('');

  const sendMessageToBeckend = async () => {
    const message = {
      message: 'Message has been sent successfully from the frontend',
    };
    try {
      const response = await fetch('http://localhost:4000/newRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      setMessages(data.message);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  return (
    <div>
      <button onClick={sendMessageToBeckend}>Send Message to Backend</button>

      {<p>{messages}</p>}
    </div>
  );
};

export default SendingSimpleMsg;
