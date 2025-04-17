const fetchTasks = async () => {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    setTasks(data.sort((a: any, b: any) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateB.getTime() - dateA.getTime();
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}; 