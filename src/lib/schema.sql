-- Schema for Wolf TV Premium
-- Tables: users, token_premium, login_session

-- Token Premium Table
CREATE TABLE token_premium (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  token_premium_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (token_premium_id) REFERENCES token_premium(id)
);

-- Login Session Table
CREATE TABLE login_session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  device_info TEXT,
  ip_address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_token_premium_token ON token_premium(token);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_token_premium_id ON users(token_premium_id);
CREATE INDEX idx_login_session_user_id ON login_session(user_id);
CREATE INDEX idx_login_session_session_token ON login_session(session_token);

-- Triggers to update the updated_at timestamp
CREATE TRIGGER update_token_premium_timestamp
AFTER UPDATE ON token_premium
BEGIN
  UPDATE token_premium SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_users_timestamp
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_login_session_timestamp
AFTER UPDATE ON login_session
BEGIN
  UPDATE login_session SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;