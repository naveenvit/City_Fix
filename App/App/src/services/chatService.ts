import { ChatMessage, ChatSession } from '../types';
import { emergencyKeywords } from '../data/emergencyKeywords';
import { faqData } from '../data/faqData';

class ChatService {
  private sessions: Map<string, ChatSession> = new Map();

  detectEmergency(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => 
      lowerMessage.includes(keyword.keyword.toLowerCase())
    );
  }

  findFAQResponse(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    for (const faq of faqData) {
      const hasKeyword = faq.keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        return faq.answer;
      }
    }
    
    return null;
  }

  generateBotResponse(userMessage: string): ChatMessage {
    const isEmergency = this.detectEmergency(userMessage);
    
    if (isEmergency) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: '🚨 This looks urgent! I\'m connecting you to a city official who can provide immediate assistance. Please stay on the line.',
        timestamp: new Date(),
        type: 'emergency'
      };
    }

    const faqResponse = this.findFAQResponse(userMessage);
    if (faqResponse) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: faqResponse,
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Default response
    const defaultResponses = [
      'I understand you need help with a community issue. Could you please provide more details about what you\'re experiencing?',
      'Thanks for reaching out! For specific issues, you can report them using the "+" button on the Community screen. Is there anything else I can help you with?',
      'I\'m here to help with community reporting questions. You can ask me about reporting issues, tracking status, or which department handles different problems.',
    ];

    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      timestamp: new Date(),
      type: 'text'
    };
  }

  createChatSession(userId: string): ChatSession {
    const sessionId = `chat_${Date.now()}`;
    const session: ChatSession = {
      id: sessionId,
      userId,
      messages: [{
        id: '1',
        sender: 'bot',
        text: 'Hello! I\'m here to help you with community issues and reporting. How can I assist you today?',
        timestamp: new Date(),
        type: 'text'
      }],
      isEmergency: false,
      status: 'active',
      createdAt: new Date()
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  addMessage(sessionId: string, message: ChatMessage): ChatSession | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    session.messages.push(message);

    if (message.sender === 'user') {
      const botResponse = this.generateBotResponse(message.text);
      session.messages.push(botResponse);

      if (botResponse.type === 'emergency') {
        session.isEmergency = true;
        this.notifyEmergency(session);
      }
    }

    return session;
  }

  private notifyEmergency(session: ChatSession): void {
    // In a real app, this would send notifications to admin dashboard
    console.log('🚨 EMERGENCY ALERT:', {
      sessionId: session.id,
      userId: session.userId,
      timestamp: new Date(),
      lastMessage: session.messages[session.messages.length - 2]?.text
    });
  }

  getSession(sessionId: string): ChatSession | null {
    return this.sessions.get(sessionId) || null;
  }
}

export const chatService = new ChatService();
