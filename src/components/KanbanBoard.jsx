import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../utils/api';
import TicketCard from './TicketCard';
import GroupSelector from './GroupSelector';
import SortSelector from './SortSelector';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [viewState, setViewState] = useState({ groupBy: 'status', sortBy: 'priority' });
  const [error, setError] = useState(null); // Add error state for API errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTickets();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to load tickets. Please try again later.');
        setTickets([]); // Clear previous tickets on error
      }
    };
    fetchData();
  }, []);

  // Grouping tickets based on the selected groupBy criteria
  const groupTickets = () => {
    if (!Array.isArray(tickets)) return {}; // Guard against invalid tickets

    return tickets.reduce((groups, ticket) => {
      const key =
        viewState.groupBy === 'priority'
          ? ticket.priority
          : viewState.groupBy === 'user'
          ? ticket.assigned_user
          : ticket.status;
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  // Sorting tickets based on the selected sortBy criteria
  const sortTickets = (tickets) => {
    if (!Array.isArray(tickets)) return [];

    const { sortBy } = viewState;
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }; // Define priority order for sorting

    return [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title); // Sort by title alphabetically
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <header>
        <GroupSelector
          value={viewState.groupBy}
          onChange={(groupBy) => setViewState((prev) => ({ ...prev, groupBy }))}
        />
        <SortSelector
          value={viewState.sortBy}
          onChange={(sortBy) => setViewState((prev) => ({ ...prev, sortBy }))}
        />
      </header>
      {/* Error message if API call fails */}
      {error && <div className="error-message">{error}</div>}
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((key) => (
          <div key={key} className="kanban-column">
            <h3>{key}</h3>
            {sortTickets(groupedTickets[key]).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
