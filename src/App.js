import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './LoginSignup';
import Users from './Users';
import ADDTask from './ADDTask';
import Todohome from './Todohome';
import { TodosProvider } from './TodosContext';
import PrivateRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/users" element={<Users />} />
      <Route path="/todo" element={<PrivateRoute>
              <Todohome />
            </PrivateRoute>} />
      <Route path="/add" element={<ADDTask />} />
    </Routes>
    </AuthProvider>
  );
}

function Root() {
  return (
    <Router>
      <TodosProvider>
        <App />
      </TodosProvider>
    </Router>
  );
}

export default Root;
