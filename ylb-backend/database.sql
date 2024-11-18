CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(15) UNIQUE  NULL COMMENT '手机号',
  username VARCHAR(255) UNIQUE NOT NULL COMMENT '用户名',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  status INT NOT NULL DEFAULT 0 COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '用户表';

CREATE INDEX idx_phone ON users(phone);
CREATE INDEX idx_username ON users(username);
alter table users add column username VARCHAR(255) UNIQUE NOT NULL   COMMENT '用户名';
alter table  users modify column phone VARCHAR(15) UNIQUE  NULL COMMENT '手机号';
CREATE TABLE short_link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    short_url VARCHAR(15) UNIQUE NOT NULL COMMENT '短链',
    origin_url VARCHAR(255) NOT NULL COMMENT '长链',
    status INT NOT NULL DEFAULT 0 COMMENT '状态',
    user_id INT NOT NULL COMMENT '创建用户',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    primary key (id),
    UNIQUE KEY `short_url` (`short_url`),
    UNIQUE KEY `origin_url` (`origin_url`),
    KEY `idx_short_url` (`short_url`),
    KEY `idx_origin_url` (`origin_url`)
) COMMENT '短链表';
