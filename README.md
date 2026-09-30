# Restful Booker Playwright Test Automation Framework

A test automation framework built with **Playwright** and **TypeScript** for testing the [Restful Booker](https://automationintesting.online) web application. The project uses the **Page Object Model (POM)**, **fixtures** and **Data-Driven Testing (DDT)** for UI automation, with a unified test data reader supporting JSON, CSV, and Excel files. **GitHub Actions** is used for automated test execution in a CI environment.

## 🏗️ Architecture & Design Patterns

This framework implements industry-standard patterns and best practices:

1. **Page Object Model (POM)**: 
- Encapsulates page elements and interactions for maintainability.
2. **Fixtures**:
- Centralizes common test setup, including navigating to the Home page and creating the ```HomePage``` object before each test.
3. **Data-Driven Testing (DDT)**: 
- Separates test data from test logic, allowing multiple test scenarios to be executed from external data files. 
- Each data set represents an individual test scenario and includes a configurable ```run``` flag for controlled test execution.
- A unified data reader supports test data stored in **JSON**, **CSV**, and **Excel** formats.

## 🛠️ Tech Stack

| **Component** | **Technology** | **Version**   |
|------------------------|------------|----------|
| Test Automation        | Playwright |  1.63.0  |
| Programming Language   | TypeScript |  7.0.2   |
| Runtime Environment    | Node.js    |  24.21.0 |
| CSV Data Parsing       | csv-parse  |  7.0.3   |
| Excel Data Processing  | xlsx       |  0.18.5  |
| Date Handling          | date-fns   |  4.4.0   |
| Test Data Generation   | faker-js   |  10.6.0  |

## 🧪 Test Coverage Summary

### 🔍 UI Testing
- **Header**: Navigation functionality for all six header links.
- **Banner**: Functionality of the [Book Now] button from the banner.
- **Rooms Availability**: Validation of check-in and check-out dates, default date values, valid and invalid date inputs, date combinations, and room availability based on the selected dates.
- **Contact Form**: Validation of contact form submission with missing required fields, invalid email addresses, and boundary values for input field lengths.
- **Footer**: Navigation functionality for all four footer links.

## 📁 Project Structure

```
restful-booker-playwright/
│
├── .github/
│   └── workflows/
│       └── playwright.yml                  # GitHub Actions workflow for automated test execution
│
├── models/
│   └── user.ts                             # User test data model
│
├── pages/
│   └── HomePage.ts                         # Page Object containing Home Page locators and interactions
│
├── test-data/
│   ├── availability/
│   │   ├── dates.json                      # Test data for room availability date scenarios
│   │   └── invalidinputs.json              # Test data for invalid room availability inputs
│   │
│   └── contact/
│       ├── invalidEmails.json              # Test data for invalid email scenarios
│       ├── messageLengths.json             # Test data for message length boundary scenarios
│       ├── phoneLengths.json               # Test data for phone number length boundary scenarios
│       ├── requiredFields.json             # Test data for required field validation scenarios
│       └── subjectLengths.json             # Test data for subject length boundary scenarios
│
├── tests/
│   ├── fixtures/
│   │   └── test-fixtures.ts                # Custom Playwright fixtures for common test setup
│   │
│   └── ui/
│       ├── availability.spec.ts             # UI tests for verifying room availability
│       ├── banner.spec.ts                   # UI tests for verifying the website banner
│       ├── contact.spec.ts                  # UI tests for verifying the contact form
│       ├── footer.spec.ts                   # UI tests for verifying the website footer
│       └── header.spec.ts                   # UI tests for verifying the website header
│
├── utils/
│   ├── csvReader.ts                         # Functions for reading CSV test data
│   ├── excelReader.ts                       # Functions for reading Excel test data
│   ├── testDataUtils.ts                     # Utility functions for test data generation
│   └── unifiedDataReader.ts                 # Reads test data from JSON, CSV, or Excel files
│
├── .gitignore                               # Specifies files/folders Git should not track
├── LICENSE                                  # Defines how others may use the project's source code
├── package-lock.json                        # Locks the exact versions of installed npm dependencies
├── package.json                             # Project metadata, dependencies, and npm scripts
├── playwright.config.ts                    # Playwright test configuration
├── README.md                                # Project documentation
└── tsconfig.json                            # TypeScript compiler configuration
```

## 🚀 Getting Started

### 🔧 Prerequisites

- **Node.js 24.21.0** or higher
- **npm** (included with Node.js)
- **Git**

### 📥 Installation

#### 1. Clone the repository:
   ```
   git clone https://github.com/stefan123283/restful-booker-playwright.git
   cd restful-booker-playwright
   ```

#### 2. Install dependencies:
   ```
   npm ci
   ```

#### 3. Install Playwright browsers:
   ```
   npx playwright install
   ```   

## 🎯 Running Tests

#### 1. Run all Playwright tests:
```
npx playwright test
```

#### 2. Run a specific test file:
```
npx playwright test tests/ui/header.spec.ts
```

#### 3. Run tests in headed mode:
```
npx playwright test --headed
```

#### 4. Run tests using a specific browser project:
```
npx playwright test --project=chromium
```

## 📊 Reporting

Playwright's built-in HTML reporter is used to provide detailed test execution results.

#### To open the HTML report after a test run:
```
npx playwright show-report
```

## 🚦 Continuous Integration

- The project uses **GitHub Actions** to automatically execute the Playwright test suite in a CI environment. 
- The workflow is defined in the ```.github/workflows/playwright.yml``` file and is triggered by pushes and pull requests targeting the ```main``` or ```master``` branches.

1. Checks out the repository.
2. Sets up the latest LTS version of Node.js.
3. Installs project dependencies.
4. Installs Playwright browsers and their required system dependencies.
5. Executes the Playwright test suite.
6. Uploads the generated Playwright HTML report as a workflow artifact with a 30-day retention period.

## 🐞 Defect Tracking

1. Defects identified during test execution are documented in the **Issues** section of the GitHub repository.
2. Tests affected by known defects are skipped to prevent CI builds from failing:
- ```test.skip()``` is used for individual tests that do not rely on external test data.
- ```"run": "no"``` is used in test-data files.

## ⚙️ Playwright Configuration

The Playwright configuration is defined in the ```playwright.config.ts``` file and includes the following settings:

| ****Configuration**** | ****Value****                                 | ****Description****                                                                              |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ```testDir```         | ```"./tests"```                               | Specifies the directory containing the test files.                                               |
| ```fullyParallel```   | ```true```                                    | Enables parallel execution of test files.                                                        |
| ```forbidOnly```      | ```!!process.env.CI```                        | Prevents accidental use of `test.only` in CI environments.                                       |
| ```retries```         | ```process.env.CI ? 1 : 0```                  | Configures one retry for failed tests in CI and no retries locally.                              |
| ```workers```         | ```process.env.CI ? 1 : undefined```          | Uses a single worker in CI while allowing Playwright to determine the number of workers locally. |
| ```reporter```        | ```[["html"], ["junit", { outputFile: "test-results/results.xml" }]]```                                  | Uses Playwright's built-in HTML reporter for local test results and the JUnit reporter to generate the ```test-results/results.xml``` file for CI/CD tools such as Jenkins.                                    |
| ```baseURL```         | ```"https://automationintesting.online"```    | Defines the base URL of the Restful Booker application.                                          |
| ```trace```           | ```"on-first-retry"```                        | Collects a trace when a test is retried after a failure.                                         |
| ```projects```        | ```Chromium, Firefox, WebKit```               | Configures test execution across the three major browser engines using desktop browser profiles. |

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
