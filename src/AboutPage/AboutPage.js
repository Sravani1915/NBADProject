import React from "react";
import "./AboutPage.scss";

function UserManual() {
  return (
    <div className="user-manual">
      {/* This is Semantic HTML tag */}
      <header className="header">
        <h1>Personal Budget App</h1>
      </header>

      {/* This is Semantic HTML tag */}
      <section className="section">
        <h2 className="section-heading">Introduction</h2>
        <p className="section-content">
          <strong>Overview</strong>
          <br />
          This is a Personal Budget App, a tool designed to help individuals manage their finances effectively by tracking income, expenses, and creating budgets.
          </p>
      </section>

      {/* This is Semantic HTML tag */}
      <section className="section">
        <h2 className="section-heading">Getting Started</h2>
        {/* This is a SEO Tag */}
        <meta name="description" content="Keeping Track of budget"></meta>
        <p className="section-content">
          <strong>Stay on Track</strong>
          <br />
          Do you know where you are spending your money? If you really stop to track it down,
          you would get surprised! Proper budget management depends on real data and this
          app will help you with that!
          {/* This is a A11y Tag */}
          Always take care about the <abbr title="Profit and Loss">P&L</abbr>.
          </p>

        {/* This is a SEO Tag */}
        <meta name="description" content="Alerts on budget"></meta>
        <p className="section-content">
          <strong>Alerts</strong>
          <br />
          What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
        </p>

        {/* This is a SEO Tag */}
        <meta name="description" content="Get out of debt faster"></meta>
        <p className="section-content">
          <strong>Result</strong>
          <br />
          People who stick to a financial plan, budgeting every expense, get out of debt faster!
          Also, they to live happier lives... since they expend without guilt or fear...
          because they know it is all good and accounted for.
          </p>

          {/* This is a SEO Tag */}
          <meta name="description" content="Free app for everybody"></meta>
          <p className="section-content">
          <strong>Free</strong>
          <br />
          This app is free!!! And you are the only one holding your data!
          </p>

      </section>

      {/* This is Semantic HTML tag */}
      <section className="section">
        <h2 className="section-heading">Dashboard & Budget Allocation</h2>
        <p className="section-content">
          <strong>Overview</strong>
          <br />
          The dashboard provides a visual representation of your budget information, utilizing pie charts, bar graphs, and tables for a comprehensive overview.
        </p>

        <p className="section-content">
          <strong>Budget Allocation</strong>
          <br />
          Visit the "Configure" page to assign budgets to various categories, and if necessary, you have the option to add new categories.
        </p>
      </section>
    </div>
  );
}

export default UserManual;
