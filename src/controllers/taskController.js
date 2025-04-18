const mongoose = require('mongoose');
const Task = require('../models/Task');

// Task creation by user
const createTaskByUser = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = new Task({
            title,
            description,
            userId: req.user.id,
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tasks by user
const getTasksByUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Task.find({userId: userId});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};

// Get all tasks by admin
const getAllTasksByAdmin = async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId','email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTaskByUser,
    getTasksByUser,
    getAllTasksByAdmin,
};
