# Restful Booker Playwright Test Automation Framework

A test automation framework built with **Playwright** and **TypeScript** for testing two applications: [**Restful-Booker-Platform**](https://automationintesting.online/), a web application, and [**Restful-Booker**](https://restful-booker.herokuapp.com/apidoc/index.html), an API. The framework uses the **Page Object Model (POM)**, **fixtures**, and **Data-Driven Testing (DDT)**, with a unified test data reader supporting JSON, CSV, and Excel files. **GitHub Actions** enables automated test execution in a CI environment.

## Table of Contents

- [🏗️ Architecture & Design Patterns](#️-architecture--design-patterns)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧪 Test Coverage Summary](#-test-coverage-summary)
  - [🔍 UI Testing - Restful-Booker-Platform web application](#-ui-testing---restful-booker-platform-web-application)
  - [⚡API Testing - Restful-Booker API](#api-testing---restful-booker-api)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
    - [1. Clone the repository:](#1-clone-the-repository)
    - [2. Install dependencies:](#2-install-dependencies)
    - [3. Install Playwright browsers:](#3-install-playwright-browsers)
- [🎯 Running Tests](#-running-tests)
    - [1. Run all Playwright tests:](#1-run-all-playwright-tests)
    - [2. Run a specific test file:](#2-run-a-specific-test-file)
    - [3. Run tests in headed mode:](#3-run-tests-in-headed-mode)
    - [4. Run tests using a specific browser project:](#4-run-tests-using-a-specific-browser-project)
- [📊 Reporting](#-reporting)
- [🚦 Continuous Integration](#-continuous-integration)
- [🐞 Defect Tracking](#-defect-tracking)
- [⚙️ Playwright Configuration](#️-playwright-configuration)
- [📄 License](#-license)

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

[⬆ Back to Table of Contents](#table-of-contents)

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

[⬆ Back to Table of Contents](#table-of-contents)

## 🧪 Test Coverage Summary

### 🔍 UI Testing - [Restful-Booker-Platform](https://automationintesting.online/) web application

📊 **Test Execution Results**: **59/65** tests passed **(91%)**.

🐞 **Defects Reported**: **4** GitHub issues.

- **Header**: Navigation functionality for all six header links - 5/6 tests passed **(83%)**. [Issue #1](https://github.com/stefan123283/restful-booker-playwright/issues/1)
- **Banner**: Functionality of the [Book Now] button - 1/1 tests passed **(100%)**.
- **Rooms Availability**: Check-in and check-out date validation, default date values, valid and invalid date inputs, date combinations, and room - availability based on selected dates - 8/9 tests passed **(89%)**. [Issue #2](https://github.com/stefan123283/restful-booker-playwright/issues/2)
- **Rooms Booking**: Room details validation, successful booking flow, booking creation with empty required fields, input field length and email format validation, booking cancellation, breadcrumb links, and the [View Details] button - 23/24 tests passed **(96%)**. [Issue #4](https://github.com/stefan123283/restful-booker-playwright/issues/4)
- **Contact Form**: Submission with missing required fields, invalid email addresses, and boundary values for input field lengths - 21/21 tests passed **(100%)**.
- **Footer**: Navigation functionality for all four footer links - 1/4 tests passed **(25%)**. [Issue #3](https://github.com/stefan123283/restful-booker-playwright/issues/3)

### ⚡API Testing - [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) API

📊 **Test Execution Results**: **46/63** tests passed **(73%)**.

🐞 **Defects Reported**: **7** GitHub issues.

- **CreateToken**: Authentication token creation - 10/10 tests passed **(100%)**.
- **GetBookingIds**: Booking ID retrieval and filtering - 5/7 tests passed **(71%)**. [Issue #5](https://github.com/stefan123283/restful-booker-playwright/issues/5)
- **GetBooking**: Retrieving booking details - 2/2 tests passed **(100%)**.
- **CreateBooking**: Booking creation and request validation - 11/20 tests passed **(55%)**. [Issue #6](https://github.com/stefan123283/restful-booker-playwright/issues/6), [Issue #7](https://github.com/stefan123283/restful-booker-playwright/issues/7), [Issue #8](https://github.com/stefan123283/restful-booker-playwright/issues/8), [Issue #9](https://github.com/stefan123283/restful-booker-playwright/issues/9)
- **UpdateBooking**: Full booking updates - 7/9 tests passed **(78%)**. [Issue #10](https://github.com/stefan123283/restful-booker-playwright/issues/10), [Issue #11](https://github.com/stefan123283/restful-booker-playwright/issues/11)
- **PartialUpdateBooking**: Partial booking updates - 9/11 tests passed **(82%)**. [Issue #10](https://github.com/stefan123283/restful-booker-playwright/issues/10), [Issue #11](https://github.com/stefan123283/restful-booker-playwright/issues/11)
- **DeleteBooking**: Booking deletion - 1/3 tests passed **(33%)**. [Issue #10](https://github.com/stefan123283/restful-booker-playwright/issues/10), [Issue #11](https://github.com/stefan123283/restful-booker-playwright/issues/11)
- **HealthCheck**: API health check - 1/1 tests passed **(100%)**.

[⬆ Back to Table of Contents](#table-of-contents)

## 📁 Project Structure

```
restful-booker-playwright/
│
├── .github/
│   └── workflows/
│       └── playwright.yml                     # GitHub Actions workflow for automated test execution
│
├── config/
│   └── test-config.json                       # Configuration settings for individual test projects
│
├── models/
│   ├── booking.ts                             # Booking data model for Restful-Booker API tests
│   └── user.ts                                # User data model for Restful-Booker-Platform tests
│
├── pages/
│   ├── BasePage.ts                            # Base Page Object containing common page functionality
│   ├── BookingPage.ts                         # Page Object containing booking page locators and interactions
│   └── HomePage.ts                            # Page Object containing home page locators and interactions
│
├── tests/
│   ├── fixtures/
│   │   └── restfulBookerPlatformFixtures.ts   # Custom Playwright fixtures for Restful-Booker-Platform tests
│   │
│   ├── Restful-Booker/
│   │   ├── test-data/
│   │   │   ├── createTokenData.json           # Test data for token creation scenarios
│   │   │   ├── depositPaidValues.json         # Test data for depositPaid field scenarios
│   │   │   ├── filterData.json                # Test data for filtering booking IDs
│   │   │   ├── invalidDates.json              # Test data for invalid booking date scenarios
│   │   │   ├── missingRequiredFields.json     # Test data for missing required fields
│   │   │   └── partialUpdate.json              # Test data for partial booking update scenarios
│   │   │
│   │   ├── create-booking.spec.ts             # API tests for creating bookings
│   │   ├── create-token.spec.ts               # API tests for authentication token creation
│   │   ├── delete-booking.spec.ts             # API tests for deleting bookings
│   │   ├── get-booking-ids.spec.ts            # API tests for retrieving and filtering booking IDs
│   │   ├── get-booking.spec.ts                # API tests for retrieving booking details
│   │   ├── health-check.spec.ts               # API tests for checking service availability
│   │   ├── partial-update-booking.spec.ts     # API tests for partially updating bookings
│   │   └── update-booking.spec.ts             # API tests for updating existing bookings
│   │
│   └── Restful-Booker-Platform/
│       ├── test-data/
│       │   ├── dates.json                     # Test data for room availability date scenarios
│       │   ├── firstNameLengths.json          # Test data for first name length boundary scenarios
│       │   ├── invalidEmails.json              # Test data for invalid email scenarios
│       │   ├── invalidinputs.json             # Test data for invalid room availability inputs
│       │   ├── lastNameLengths.json           # Test data for last name length boundary scenarios
│       │   ├── messageLengths.json            # Test data for message length boundary scenarios
│       │   ├── phoneLengths.json              # Test data for phone number length boundary scenarios
│       │   ├── requiredFieldsBookingForm.json # Test data for required booking form field validation
│       │   ├── requiredFieldsContactForm.json # Test data for required contact form field validation
│       │   └── subjectLengths.json             # Test data for subject length boundary scenarios
│       │
│       ├── availability.spec.ts               # UI tests for room availability and date validation
│       ├── banner.spec.ts                     # UI tests for the website banner
│       ├── booking.spec.ts                    # UI tests for the room booking functionality
│       ├── contact.spec.ts                    # UI tests for contact form validation and submission
│       ├── footer.spec.ts                     # UI tests for footer elements and navigation links
│       └── header.spec.ts                     # UI tests for header elements and navigation links
│
├── utils/
│   ├── csvReader.ts                           # Functions for reading CSV test data
│   ├── excelReader.ts                          # Functions for reading Excel test data
│   ├── restfulBookerApi.ts                    # Functions for Restful-Booker API requests
│   ├── testDataUtils.ts                       # Utility functions for test data generation
│   └── unifiedDataReader.ts                   # Reads test data from JSON, CSV, or Excel files
│
├── .gitignore                                 # Specifies files and folders Git should not track
├── LICENSE                                    # Defines how others may use the project's source code
├── package-lock.json                          # Locks the exact versions of installed npm dependencies
├── package.json                               # Project metadata, dependencies, and npm scripts
├── playwright.config.ts                       # Playwright test configuration
├── README.md                                  # Project documentation
└── tsconfig.json                              # TypeScript compiler configuration
```

[⬆ Back to Table of Contents](#table-of-contents)

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

[⬆ Back to Table of Contents](#table-of-contents)

## 📊 Reporting

Playwright's built-in HTML reporter is used to provide detailed test execution results.

To open the HTML report after a test run:
```
npx playwright show-report
```

[⬆ Back to Table of Contents](#table-of-contents)

## 🚦 Continuous Integration

- The project uses **GitHub Actions** to automatically execute the Playwright test suite in a CI environment. 
- The workflow is defined in the ```.github/workflows/playwright.yml``` file and is triggered by pushes and pull requests targeting the ```main``` or ```master``` branches.

1. Checks out the repository.
2. Sets up the latest LTS version of Node.js.
3. Installs project dependencies.
4. Installs Playwright browsers and their required system dependencies.
5. Executes the Playwright test suite.
6. Uploads the generated Playwright HTML report as a workflow artifact with a 30-day retention period.

[⬆ Back to Table of Contents](#table-of-contents)

## 🐞 Defect Tracking

1. Defects identified during test execution are documented in the **Issues** section of the GitHub repository.
2. Tests affected by known defects are skipped to prevent CI builds from failing:
- ```test.skip()``` is used for individual tests that do not rely on external test data.
- ```"run": "no"``` is used in test-data files.

[⬆ Back to Table of Contents](#table-of-contents)

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

[⬆ Back to Table of Contents](#table-of-contents)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

[⬆ Back to Table of Contents](#table-of-contents)