import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';


describe('<App/>', () => {
  render(<App />);

  it('should render a form', () => {
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });
});
