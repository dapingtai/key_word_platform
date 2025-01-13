import { Component, JSX } from 'solid-js';
import '../styles/Card.css';

interface CardProps {
  children: JSX.Element;
  className?: string;
}

const Card: Component<CardProps> = (props) => {
  return (
    <div class="card">
      {props.children}
    </div>
  );
};

export default Card;