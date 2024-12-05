const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { UserStatus } = require('../datadict/enums/UserEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const { hashPassword, validatePassword } = require('../utils/userUtils');
const roles = require('../models/roles'); // 引入角色模型
//代码未经测试
// 添加角色
exports.addRole = async (req, res) => {
    const { name, resource, permission } = req.body;
    try {
        const newRole = await roles.create({ name, resource, permission });
        res.json({ ...ErrorNoEnums.SUCCESS, data: newRole });
    } catch (error) {
        logger.error('添加角色失败: %s', error.message);
        res.json(ErrorNoEnums.REGISTER_FAILED);
    }
};

// 查询角色
exports.getRoles = async (req, res) => {
    try {
        const allRoles = await roles.findAll();
        res.json({ ...ErrorNoEnums.SUCCESS, data: allRoles });
    } catch (error) {
        logger.error('查询角色失败: %s', error.message);
        res.json(ErrorNoEnums.UNEXPECTED_ERROR);
    }
};

// 编辑角色
exports.updateRole = async (req, res) => {
    const { id, name, resource, permission } = req.body;
    try {
        const role = await roles.findByPk(id);
        if (!role) {
            return res.json(ErrorNoEnums.ROLE_NOT_FOUND);
        }
        role.name = name;
        role.resource = resource;
        role.permission = permission;
        await role.save();
        res.json({ ...ErrorNoEnums.SUCCESS, data: role });
    } catch (error) {
        logger.error('编辑角色失败: %s', error.message);
        res.json(ErrorNoEnums.UNEXPECTED_ERROR);
    }
};

// 删除角色
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await roles.findByPk(id);
        if (!role) {
            return res.json(ErrorNoEnums.ROLE_NOT_FOUND);
        }
        await role.destroy();
        res.json({ ...ErrorNoEnums.SUCCESS, message: '角色已删除' });
    } catch (error) {
        logger.error('删除角色失败: %s', error.message);
        res.json(ErrorNoEnums.UNEXPECTED_ERROR);
    }
};


