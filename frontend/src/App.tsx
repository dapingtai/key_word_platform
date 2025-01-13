import { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Navbar from './components/Navbar';
import SearchInterface from './page/SearchInterface';
import './styles/App.css';

export const App: Component = () => {
  return (
    <div class="app">
      <Navbar />
      <main class="main-content">
        <Router>
          <Route path="/" component={SearchInterface} />
          <Route path="/voice" component={SearchInterface} />
        </Router>
      </main>
    </div>
  );
};