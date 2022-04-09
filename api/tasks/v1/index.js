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
        const query = { id: Number(id) }
        const task = await mongo.fetchOne("tasks", query);
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
        console.log(req.body)
        const { id } = req.params;
        const query = { id: Number(id) }
        const task = await mongo.updateData('tasks', query, { $set: { ...req.body } })
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = { id: Number(id) }
        const task = await mongo.deleteData('tasks', query)
        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
router.get("/tasks", getTasks)
router.post('/task', postTask)
router.get('/singleTask/:id', getTask)
router.put("/taskUpdate/:id", updateTask)
router.delete("/taskDelete/:id", deleteTask)

module.exports = router;
