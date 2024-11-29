export const saveViewState = (state) => {
    localStorage.setItem('kanbanViewState', JSON.stringify(state));
  };
  
  export const loadViewState = () => {
    const state = localStorage.getItem('kanbanViewState');
    return state ? JSON.parse(state) : { groupBy: 'status', sortBy: 'priority' };
  };
  