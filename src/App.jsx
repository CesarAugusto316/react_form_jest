import { SignupForm } from './components';


export const App = () => {
  const handleSubmit = (values) => console.log(values);

  return (
    <div id="app" data-theme="dark">
      <section className="section">
        <main className="main">
          <SignupForm handleSubmit={handleSubmit} />
        </main>
      </section>
    </div>
  );
};
