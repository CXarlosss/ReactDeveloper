import  { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import type{ Conversation } from '../types/Conversation';

const ChatPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ConversationListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #ccc;
  padding: 15px;
`;

const ConversationItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MessageWindowContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const MessageListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 15px;
`;

const MessageItem = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  background-color: #e6f7ff;
`;

const MessageInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function ChatPage() {
  const { user, logout } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const [conversations, setConversations] = useState<Conversation[]>([
  { id: '1', name: 'Grupo de Desarrollo' },
  { id: '2', name: 'Carlos (Privado)' },
]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { id: 'm1', conversationId: '1', sender: 'User1', text: 'Hola a todos!' },
    { id: 'm2', conversationId: '1', sender: 'User2', text: 'Qué tal?' },
    { id: 'm3', conversationId: '2', sender: 'Carlos', text: 'Hola, ¿cómo va?' },
    { id: 'm4', conversationId: '2', sender: user?.username || 'Yo', text: 'Todo bien!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Aquí iría la lógica para cargar las conversaciones del usuario desde el backend
    // y los mensajes de la conversación seleccionada.
    console.log('User logged in:', user?.username);
  }, [user]);

  const handleConversationSelect = (id: string) => {
    setSelectedConversationId(id);
    // Aquí iría la lógica para cargar los mensajes de la conversación con ID `id`
    console.log('Conversation selected:', id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversationId) {
      const newMessageObject = {
        id: `m${Date.now()}`, // ID temporal
        conversationId: selectedConversationId,
        sender: user?.username || 'Yo',
        text: newMessage,
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
      // Aquí iría la lógica para enviar el mensaje al backend
      console.log('Sending message:', newMessageObject);
    }
  };

  return (
    <ChatPageContainer>
      <ConversationListContainer>
        <h2>Chats</h2>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            onClick={() => handleConversationSelect(conv.id)}
            style={{ backgroundColor: selectedConversationId === conv.id ? '#e0f2f7' : 'transparent' }}
          >
            {conv.name}
          </ConversationItem>
        ))}
        <button onClick={logout}>Cerrar Sesión</button>
      </ConversationListContainer>
      <MessageWindowContainer>
        {selectedConversationId ? (
          <>
            <MessageListContainer>
              {messages
                .filter((msg) => msg.conversationId === selectedConversationId)
                .map((msg) => (
                  <MessageItem key={msg.id}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </MessageItem>
                ))}
            </MessageListContainer>
            <MessageInputContainer>
              <MessageInput
                type="text"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <SendButton onClick={handleSendMessage}>Enviar</SendButton>
            </MessageInputContainer>
          </>
        ) : (
          <p>Selecciona una conversación para empezar a chatear.</p>
        )}
      </MessageWindowContainer>
    </ChatPageContainer>
  );
}

export default ChatPage;