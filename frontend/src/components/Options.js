import React, { useState } from 'react';
import './Options.css';

const Options = ({ onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTestingFramework, setSelectedTestingFramework] = useState('');

  const programmingLanguages = [
    {
      name: 'Java',
      testingFrameworks: ['JUnit', 'TestNG', 'Selenium', 'Cucumber', 'RestAssured'],
    },
    {
      name: 'Python',
      testingFrameworks: ['pytest', 'unittest', 'nose', 'Behave', 'Selenium'],
    },
    {
      name: 'JavaScript',
      testingFrameworks: ['Mocha', 'Jest', 'Cypress', 'Puppeteer', 'Jasmine'],
    },
    {
      name: 'Ruby',
      testingFrameworks: ['RSpec', 'Cucumber', 'MiniTest', 'Watir'],
    },
    // Add more programming languages and their testing frameworks here
  ];

  const handleLanguageChange = (e) => {
    const selectedLanguageValue = e.target.value;
    setSelectedLanguage(selectedLanguageValue);
    setSelectedTestingFramework('');

    onChange({ language: selectedLanguageValue, framework: '' });
  };

  const handleTestingFrameworkChange = (e) => {
    setSelectedTestingFramework(e.target.value);
    onChange({ language: selectedLanguage, framework: e.target.value });
  };

  return (
    <div className="options-container">
      <form>
        <div className="form-group">
          <label htmlFor="programmingLanguage">Programming Language:</label>
          <select
            id="programmingLanguage"
            className="form-control"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="">Select a language</option>
            {programmingLanguages.map((language) => (
              <option key={language.name} value={language.name}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        {selectedLanguage && (
          <div className="form-group">
            <label htmlFor="testingFramework">Testing Framework:</label>
            <select
              id="testingFramework"
              className="form-control"
              value={selectedTestingFramework}
              onChange={handleTestingFrameworkChange}
            >
              <option value="">Select a testing framework</option>
              {programmingLanguages
                .find((language) => language.name === selectedLanguage)
                ?.testingFrameworks.map((framework) => (
                  <option key={framework} value={framework}>
                    {framework}
                  </option>
                ))}
            </select>
          </div>
        )}
      </form>
    </div>
  );
};

export default Options;
