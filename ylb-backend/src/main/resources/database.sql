CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `phone` varchar(15) DEFAULT NULL COMMENT '手机号',
                         `username` varchar(255) NOT NULL COMMENT '用户名',
                         `password` varchar(255) NOT NULL COMMENT '密码',
                         `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
                         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                         `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `username` (`username`),
                         UNIQUE KEY `phone` (`phone`),
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';



CREATE TABLE roles (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL UNIQUE COMMENT '角色名称'
);

CREATE TABLE permissions (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(255) NOT NULL UNIQUE COMMENT '权限名称',
                             description TEXT collate utf8_general_ci COMMENT '描述'
);


CREATE TABLE user_roles (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            user_id BIGINT NOT NULL COMMENT '用户id',
                            role_id BIGINT NOT NULL COMMENT '角色id',
                            UNIQUE KEY (user_id, role_id)
);

CREATE TABLE role_permissions (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  role_id BIGINT NOT NULL COMMENT  '角色id',
                                  permission_id BIGINT NOT NULL COMMENT '权限id',
                                  UNIQUE KEY (role_id, permission_id)
);