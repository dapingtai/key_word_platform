import { Component } from 'solid-js';
import '../styles/Navbar.css';

const Navbar: Component = () => {
  return (
    <nav class="navbar">
      <div class="navbar-brand">
        <a href="/" class="navbar-logo">Search App</a>
      </div>
      <div class="navbar-menu">
        <a href="#" class="navbar-item">Home</a>
        <a href="#" class="navbar-item">About</a>
        <a href="#" class="navbar-item">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;