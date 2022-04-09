const root = require('app-root-path')
const router = require('express').Router()

const mongo = require(`${root}/services/mongo-crud`);


getTasks = async (req, res, next) => {
    try {
        const tasks = await mongo.fetchMany("tasks");
        return res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await mongo.fetchOne("tasks", { id });
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
postTask = async (req, res, next) => {
    try {
        const task = await mongo.insertOne('tasks', { ...req.body })
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await mongo.updateData('tasks', { id }, { ...req.body })
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await mongo.deleteData('tasks', { id })
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
router.get("/tasks", getTasks)
router.post('/task', postTask)
router.get('/singleTask/:id', getTask)
router.put("/task/:id", updateTask)
router.delete("/taskDelete/:id", deleteTask)

module.exports = router;
