import React from 'react';
import './TicketCard.css';

const priorityIcons = {
  0: '🟢', // No priority
  1: '🔵', // Low
  2: '🟠', // Medium
  3: '🔴', // High
  4: '🚨'  // Urgent
};

const TicketCard = ({ ticket }) => {
  const priorityIcon = priorityIcons[ticket.priority] || '❓';

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="ticket-priority">{priorityIcon}</span>
      </div>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-tags">
        {ticket.tag.map((tag, index) => (
          <span key={index} className="ticket-tag">
            • {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;