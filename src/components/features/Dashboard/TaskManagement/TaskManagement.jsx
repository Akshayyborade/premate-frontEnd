import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import './TaskManagement.css';
import Button from '../../../common/Button/Button';
import taskService from '../../../../services/task.service';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('dueDate');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending'
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskService.getAllTasks();
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again later.');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await taskService.createTask(newTask);
            await fetchTasks();
            setIsModalOpen(false);
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
                priority: 'medium',
                status: 'pending'
            });
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error('Error creating task:', err);
        }
    };

    const handleUpdateStatus = async (taskId, newStatus) => {
        try {
            await taskService.updateTaskStatus(taskId, newStatus);
            await fetchTasks();
        } catch (err) {
            setError('Failed to update task status. Please try again.');
            console.error('Error updating task status:', err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(taskId);
                await fetchTasks();
            } catch (err) {
                setError('Failed to delete task. Please try again.');
                console.error('Error deleting task:', err);
            }
        }
    };

    const filteredTasks = tasks
        .filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                task.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || task.status === filter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sortBy === 'priority') {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return 0;
        });

    const getPriorityColor = (priority) => {
        const colors = {
            high: '#f44336',
            medium: '#ff9800',
            low: '#4caf50'
        };
        return colors[priority] || '#666';
    };

    const getStatusColor = (status) => {
        const colors = {
            completed: '#4caf50',
            inProgress: '#2196f3',
            pending: '#ff9800'
        };
        return colors[status] || '#666';
    };

    return (
        <div className="task-management">
            <div className="task-header">
                <h2>Task Management</h2>
                <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                    className="add-task-btn"
                >
                    <FaPlus /> Add Task
                </Button>
            </div>

            <div className="task-controls">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-sort">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Tasks</option>
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading tasks...</div>
            ) : (
                <div className="task-list">
                    {filteredTasks.map(task => (
                        <div key={task.id} className="task-card">
                            <div className="task-header">
                                <h3>{task.title}</h3>
                                <div className="task-actions">
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                                        style={{ backgroundColor: getStatusColor(task.status) }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <p className="task-description">{task.description}</p>
                            <div className="task-footer">
                                <span className="due-date">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span
                                    className="priority"
                                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                                >
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Create New Task</h3>
                        <form onSubmit={handleCreateTask}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Due Date</label>
                                <input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <Button type="submit" variant="primary">Create Task</Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskManagement; 