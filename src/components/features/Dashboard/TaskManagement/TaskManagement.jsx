import React, { useState, useEffect } from 'react';
import { taskService } from '../../../../services/api/task.service';
import Button from '../../../common/Button/Button';
import './TaskManagement.css';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const task = await taskService.createTask({ title: newTask });
            setTasks([task, ...tasks]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTask = async (taskId) => {
        try {
            await taskService.toggleTask(taskId);
            setTasks(tasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            ));
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (loading) return <div className="tasks-loading">Loading...</div>;

    return (
        <div className="task-management">
            <div className="section-header">
                <h2>Tasks</h2>
            </div>
            <form className="task-form" onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <Button type="submit" variant="primary" size="small">
                    Add
                </Button>
            </form>
            <div className="tasks-list">
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        No tasks yet
                    </div>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="task-item">
                            <label className="task-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                                {task.title}
                            </span>
                            <button
                                className="task-delete"
                                onClick={() => deleteTask(task.id)}
                                aria-label="Delete task"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskManagement; 