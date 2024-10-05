# README.md

## Version: v1.0.0

---

### Project Title: Electron.js Forge Application for Automated PDF Renaming and Filing

### Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Current Status](#current-status)
- [Goals](#goals)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development Plan](#development-plan)
- [Git Commit Guidelines](#git-commit-guidelines)
- [Future Enhancements](#future-enhancements)
- [Contact Information](#contact-information)

---

## Introduction

This project aims to develop a desktop application using Electron.js Forge and Vue 3 to automate the process of renaming PDF files based on their content and organizing them into the correct directories. The application leverages AI through OpenAI's GPT models to generate accurate filenames and supports features like directory monitoring, OCR integration with Tesseract, and user feedback loops for continuous improvement.

---

## Project Overview

### Background

We are a property management company in Germany that deals with a significant volume of documents related to the properties we manage. Previously, we used a CLI tool to rename PDFs by extracting content, sending it to OpenAI with a prompt, and receiving a structured response containing the new filename and directory location.

### Purpose

The new Electron.js Forge application will:

- Automate the renaming and filing of PDF documents based on their content.
- Monitor directories for new files and process them in real-time.
- Categorize documents into predefined categories relevant to the property management industry.
- Use OCR technology for image-based PDFs.
- Allow user interaction to correct and improve the renaming and filing process over time.
- Integrate with our existing web application for user management, payment processing, and configuration.

---

## Current Status

- **Frontend Framework**: Vue 3 selected for building the user interface.
- **Backend Framework**: Electron.js chosen for building the desktop application.
- **OpenAI Integration**: Currently using GPT-4 models for filename generation.
- **Configuration Files**: Existing `config.json` and `properties.json` files define directory paths and property information.
- **File Processing Logic**: Initial file processing scripts are available and need to be integrated into the new application.

---

## Goals

1. **Core Functionality**: Implement file monitoring, content extraction, AI-based filename generation, and file moving.
2. **User Interface**: Develop an intuitive UI for configuration, monitoring, and user feedback.
3. **User Feedback Loop**: Allow users to correct filenames and filing directories to improve the AI model over time.
4. **Integration with Web Application**: Enable authentication, configuration sync, and subscription checks via API.
5. **Logging and Error Handling**: Implement comprehensive logging and robust error handling mechanisms.
6. **Internationalization**: Support both German and English languages in the UI.

---

## Project Structure

```
project-root/
├── src/
│   ├── main/
│   │   ├── index.js        # Electron main process
│   │   └── services/       # Backend services (file processing, OpenAI integration)
│   ├── renderer/
│   │   ├── App.vue         # Vue root component
│   │   ├── components/     # Vue components
│   │   └── assets/         # Static assets
├── config/
│   └── config.json         # Configuration file
├── logs/
│   └── file-operations.csv # Log files
├── package.json
└── README.md
```

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14.x or higher)
- **Git**

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/pdf-renamer-electron.git
   cd pdf-renamer-electron
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Configuration**

   - Copy the sample configuration file:

     ```bash
     cp config/config.sample.json config/config.json
     ```

   - Edit `config/config.json` to match your directory paths and settings.

4. **Set Up Environment Variables**

   - Create a `.env` file in the project root:

     ```bash
     touch .env
     ```

   - Add your OpenAI API key and organization ID to the `.env` file:

     ```ini
     OPENAI_API_KEY=your-openai-api-key
     OPENAI_ORGANIZATION_ID=your-openai-organization-id
     ```

     **Note**: Keep your API keys secure and do not commit the `.env` file to version control.

5. **Run the Application**

   ```bash
   npm start
   ```

---

## Configuration

The application uses a `config.json` file located in the `config/` directory to manage settings.

### Sample Configuration

```json
{
  "mode": "production",
  "production": {
    "basePropertyDir": "C:/Path/To/Properties",
    "filesDir": "C:/Path/To/Incoming/Files",
    "backupDir": "C:/Path/To/Backup",
    "landlordDir": "C:/Path/To/Landlords",
    "failedDir": "C:/Path/To/Failed",
    "successDir": "C:/Path/To/Success",
    "openaiModel": "gpt-4",
    "checkFrequency": 6000,
    "propertyManagementCompany": "Your Company Name",
    "specialDocuments": [
      "Mietvertrag",
      "Übergabeprotokoll",
      "Abnahmeprotokoll",
      "Vermieterbescheinigung"
    ]
  }
}
```

### Configuration Parameters

- **basePropertyDir**: The root directory where property folders are located.
- **filesDir**: Directory to monitor for incoming PDF files.
- **backupDir**: Directory where backups of processed files are stored.
- **landlordDir**: Directory for landlord copies of documents.
- **failedDir**: Directory for files that failed to process.
- **successDir**: Directory for successfully processed files.
- **openaiModel**: OpenAI model to use for filename generation.
- **checkFrequency**: Interval (in milliseconds) for directory monitoring.
- **propertyManagementCompany**: Name of your company.
- **specialDocuments**: List of special document types that follow a specific naming convention.

---

## Usage

1. **Start the Application**

   ```bash
   npm start
   ```

2. **Configure Settings**

   - Navigate to the settings page in the application.
   - Update directory paths and preferences as needed.

3. **Monitor Directory**

   - The application will automatically monitor the specified `filesDir` for new PDFs.
   - When a new file is detected, it will be processed automatically.

4. **Review Processed Files**

   - Processed files will appear in the application dashboard.
   - Review filenames and directories for accuracy.
   - Provide feedback or corrections if necessary.

5. **User Feedback Loop**

   - If a filename or filing location is incorrect, edit it directly in the application.
   - The system will learn from your corrections to improve future accuracy.

---

## Development Plan

### Phase 1: Project Initialization

1. **Set Up GitHub Repository**

   - Create a new repository named `pdf-renamer-electron`.
   - Initialize with a `.gitignore` for Node.js and an initial `README.md`.

   ```bash
   git init
   git add .
   git commit -m "chore: initial commit with project setup"
   git branch -M main
   git remote add origin https://github.com/your-username/pdf-renamer-electron.git
   git push -u origin main
   ```

2. **Define Project Structure**

   - Create directories: `src/main`, `src/renderer`, `config`, `logs`.

   ```bash
   mkdir -p src/main/services src/renderer/components config logs
   ```

   - **Git Commit**

     ```bash
     git add .
     git commit -m "chore: project directory structure established"
     ```

### Phase 2: Environment Setup

3. **Initialize Electron Forge Project**

   - Run the Electron Forge initializer:

     ```bash
     npx create-electron-app .
     ```

   - **Git Commit**

     ```bash
     git add .
     git commit -m "chore: Electron Forge initialized"
     ```

4. **Integrate Vue 3 with Electron**

   - Install Vue 3 and necessary dependencies:

     ```bash
     npm install vue@next
     ```

   - Configure the renderer process to use Vue 3.

   - **Git Commit**

     ```bash
     git add .
     git commit -m "feat: integrated Vue 3 with Electron"
     ```

5. **Set Up ESLint and Prettier**

   - Install ESLint and Prettier:

     ```bash
     npm install eslint prettier eslint-plugin-vue --save-dev
     ```

   - Initialize ESLint configuration:

     ```bash
     npx eslint --init
     ```

   - **Git Commit**

     ```bash
     git add .
     git commit -m "chore: set up ESLint and Prettier for code linting and formatting"
     ```

### Phase 3: Core Functionality Development

6. **Implement File Monitoring**

   - Install `chokidar` for file system monitoring:

     ```bash
     npm install chokidar
     ```

   - Create a service in `src/main/services/fileMonitorService.js` to monitor `filesDir`.

   - **Git Commit**

     ```bash
     git add .
     git commit -m "feat: implemented file monitoring with chokidar"
     ```

7. **Develop PDF Text Extraction**

   - Install `pdf-parse`:

     ```bash
     npm install pdf-parse
     ```

   - Create a service in `src/main/services/pdfService.js` for text extraction.

   - **Git Commit**

     ```bash
     git add .
     git commit -m "feat: added PDF text extraction functionality"
     ```

8. **Integrate Tesseract OCR**

   - Install `tesseract.js`:

     ```bash
     npm install tesseract.js
     ```

   - Update `pdfService.js` to use OCR when text extraction fails.

   - **Git Commit**

     ```bash
     git add .
     git commit -m "feat: integrated Tesseract OCR for image-based PDFs"
     ```

9. **Set Up OpenAI API Integration**

   - Install OpenAI SDK:

     ```bash
     npm install openai
     ```

   - Create a service in `src/main/services/openaiService.js`.

   - Securely store API keys in `.env`.

   - **Git Commit**

     ```bash
     git add .
     git commit -m "feat: set up OpenAI API integration"
     ```

10. **Implement File Renaming Logic**

    - Create `src/main/services/fileProcessingService.js`.

    - Implement logic to generate filenames based on AI responses.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented file renaming logic with AI-generated filenames"
      ```

11. **Implement File Filing Logic**

    - Move files to the appropriate directories based on the new filename.

    - Create directories if they don't exist.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented file filing logic"
      ```

12. **Add Logging Mechanism**

    - Create a logging service in `src/main/services/logService.js`.

    - Log file operations in `logs/file-operations.csv`.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: added logging mechanism for file operations"
      ```

### Phase 4: User Interface Enhancements

13. **Design User Interface**

    - Create Vue components for the main dashboard, settings, and file review.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: designed basic user interface components"
      ```

14. **Implement Settings and Configuration**

    - Build a settings page for users to update configuration parameters.

    - Bind UI inputs to update `config.json`.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented settings page for configuration"
      ```

15. **Add Real-Time Status Updates**

    - Use Vue's reactivity to display real-time processing status.

    - Show recent activity and errors on the dashboard.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: added real-time status updates to dashboard"
      ```

16. **Implement Feedback Loop Interface**

    - Allow users to review and correct filenames and filing locations.

    - Store corrections in a local database (e.g., SQLite).

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented user feedback loop interface"
      ```

### Phase 5: Enhancing AI Model and Learning

17. **Store User Feedback**

    - Install `better-sqlite3` for SQLite integration:

      ```bash
      npm install better-sqlite3
      ```

    - Create a service in `src/main/services/databaseService.js`.

    - Store user corrections and feedback.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: stored user feedback in SQLite database"
      ```

18. **Implement Learning Mechanism**

    - Modify `openaiService.js` to include user feedback in prompts.

    - Consider using embeddings or fine-tuning for improved accuracy.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented learning mechanism to improve AI model over time"
      ```

19. **Optimize OpenAI Usage**

    - Implement caching for similar requests.

    - Handle rate limits and errors gracefully.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "perf: optimized OpenAI API usage and error handling"
      ```

### Phase 6: Integration with Web Application

20. **Develop API Endpoints on Laravel Backend**

    - **On Laravel Side**:

      - Create API routes for authentication, configuration retrieval, and feedback submission.

      - Secure the API with Laravel Sanctum or Passport.

    - **Git Commit (Backend)**

      ```bash
      git add .
      git commit -m "feat: developed API endpoints for desktop app integration"
      ```

21. **Integrate API in Desktop App**

    - Install `axios` for HTTP requests:

      ```bash
      npm install axios
      ```

    - Implement authentication flow in the Electron app.

    - Sync user settings and configurations.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: integrated Laravel API into desktop application"
      ```

22. **Implement Payment Processing Checks**

    - Before processing files, check user's subscription status via API.

    - Handle different user tiers and permissions.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented payment processing and subscription checks"
      ```

23. **Sync Properties and Categories**

    - Fetch `properties.json` and category mappings from the web application.

    - Allow updates to be pushed from the desktop app if permitted.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: synchronized properties and categories with web application"
      ```

### Phase 7: Error Handling and Notifications

24. **Implement Robust Error Handling**

    - Catch and handle exceptions throughout the application.

    - Display user-friendly error messages.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: improved error handling across the application"
      ```

25. **Add Notification System**

    - Use a library like `electron-notify` for desktop notifications.

      ```bash
      npm install electron-notify
      ```

    - Notify users of errors and important events.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: added notification system for user alerts"
      ```

26. **Retry Logic for Failures**

    - Implement retry mechanisms with a maximum of two retries.

    - Allow manual retries from the UI.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "feat: implemented retry logic for transient failures"
      ```

### Phase 8: Testing and Quality Assurance

27. **Write Unit Tests**

    - Install Jest for testing:

      ```bash
      npm install jest --save-dev
      ```

    - Write unit tests for critical functions in services.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "test: added unit tests for core services"
      ```

28. **Perform Integration Testing**

    - Test interactions between services.

    - Create test cases for edge scenarios.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "test: performed integration testing and resolved issues"
      ```

29. **Conduct User Acceptance Testing**

    - Test the application in real-world scenarios.

    - Collect feedback and make necessary adjustments.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "chore: conducted user acceptance testing and implemented feedback"
      ```

30. **Fix Bugs and Optimize Performance**

    - Address any bugs identified.

    - Optimize file processing times.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "fix: resolved bugs and optimized performance"
      ```

### Phase 9: Deployment and Release

31. **Set Up CI/CD Pipeline**

    - Use GitHub Actions for automated builds and tests.

    - Configure workflows for testing and packaging.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "ci: set up GitHub Actions for CI/CD"
      ```

32. **Prepare for Deployment**

    - Generate installers for Windows 10.

    - Sign the application if necessary.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "chore: prepared deployment artifacts for Windows"
      ```

33. **Update Documentation**

    - Write user manuals and update `README.md`.

    - Include installation and usage instructions.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "docs: updated documentation and user guides"
      ```

34. **Release Application**

    - Create a release on GitHub (e.g., v1.0.0).

    - Attach installers and release notes.

    - **Git Commit**

      ```bash
      git tag -a v1.0.0 -m "Release version 1.0.0"
      git push origin v1.0.0
      ```

### Phase 10: Post-Release Activities

35. **Monitor and Support**

    - Set up a support email or issue tracker.

    - Monitor logs for any post-release issues.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "chore: set up support infrastructure"
      ```

36. **Plan for Future Enhancements**

    - Collect feature requests.

    - Update roadmap for future versions.

    - **Git Commit**

      ```bash
      git add .
      git commit -m "chore: updated project roadmap for future enhancements"
      ```

---

## Git Commit Guidelines

- **Commit Messages**: Use clear, concise messages starting with a verb (e.g., "feat:", "fix:", "docs:").

- **Branching Strategy**: Use `main` for stable releases and feature branches like `feature/your-feature-name`.

- **Commit Frequency**: Commit changes often to keep track of progress and make it easier to roll back if necessary.

---

## Future Enhancements

- **Internationalization**: Expand language support beyond German and English.

- **Offline Functionality**: Implement local AI models to allow offline operation.

- **Advanced Learning**: Use machine learning techniques to improve the AI model's accuracy.

- **User Management**: Enhance integration with the web application for comprehensive user management.

---

## Contact Information

For any questions or support, please contact:

- **Email**: support@yourcompany.com
- **GitHub Issues**: [GitHub Repository Issues](https://github.com/your-username/pdf-renamer-electron/issues)

---

# Conclusion

By following this detailed plan and utilizing the resources provided, you will be able to develop the Electron.js Forge application successfully. Remember to commit your code frequently with clear messages, and don't hesitate to reach out for assistance when needed.

**Happy Coding!**

---

# Additional Assistance

If you need further explanation on any of the steps or assistance with specific parts of the code, feel free to ask. I'm here to help you navigate through the development process, ensuring you understand each component and how it contributes to the overall project.