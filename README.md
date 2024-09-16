# CSRF Demo Application

This project consists of two Express applications that demonstrate a Cross-Site Request Forgery (CSRF) attack:

1. **Vulnerable Banking Application** (`localhost:3000`): A simple banking app with login, a dashboard, and a profile page where a user can update their personal information.
2. **Attacker Application** (`localhost:4000`): A malicious site disguised as a hiking registration form that silently submits a cross-origin request to the banking app to update the user's profile without their knowledge.

This setup shows how a CSRF attack can exploit vulnerabilities in a web application that does not implement proper CSRF protection.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SafeSquid-GitHub/bank-ease.git csrf-demo
   cd csrf-demo
   ```

2. **Install Dependencies:**
   Navigate to the directories for both applications and install dependencies.

   For the vulnerable banking app:

   ```bash
   cd bankease
   npm install
   ```

   For the attacker app:

   ```bash
   cd hiking
   npm install
   ```

3. **Run the Applications:**

   Start the vulnerable banking app (`localhost:3000`):

   ```bash
   cd bankease
   npm start
   ```

   Start the attacker app (`localhost:4000`):

   ```bash
   cd hiking
   npm start
   ```

### Application Details

#### Vulnerable Banking Application (`localhost:3000`)

This app simulates a simple banking system with user login, dashboard, and profile functionality. It lacks CSRF protection, making it vulnerable to attacks.

1. **Login Page:**

   - Accessible at `http://localhost:3000/login`
   - Use the following credentials:
     - Username: `rushabh@safesquid.net`
     - Password: `secret`

   After login, the user is redirected to the dashboard.

2. **Dashboard Page:**

   - Accessible at `http://localhost:3000/`
   - Displays a basic statistics and links to the profile page if the user is authenticated.

3. **Profile Page:**
   - Accessible at `http://localhost:3000/profile`
   - Allows the logged-in user to update their profile detailss.

#### Attacker Application (`localhost:4000`)

The attacker app simulates a malicious website that performs a CSRF attack on the banking app.

1. **Hiking Registration Form (Malicious Page):**

   - Accessible at `http://localhost:4000`
   - Displays a fake hiking registration form, which has no real functionality.
   - Contains a hidden form that submits a POST request to `http://localhost:3000/profile`, changing the mobile number of the logged-in user in the banking app.

2. **CSRF Attack Mechanism:**
   - The hidden form is auto-submitted in an invisible iframe to avoid redirecting the user to the banking app.
   - This attack leverages the fact that the browser automatically includes session cookies for the vulnerable domain (`localhost:3000`) in the form submission, allowing the attack to succeed.

### How to Test the CSRF Attack

1. **Login to the Banking App:**

   - Visit `http://localhost:3000/login` and log in using the credentials:
     - Username: `rushabh@safesquid.net`
     - Password: `secret`

2. **View Profile:**

   - Go to `http://localhost:3000/profile` to see the current email and mobile number of the user.

3. **Trigger the CSRF Attack:**
   - Open `http://localhost:4000` in another browser tab.
   - You will see a hiking trip registration form, but in the background, your mobile number will be updated in the banking app due to the hidden form submission.
4. **Verify Profile Update:**
   - Go back to `http://localhost:3000/profile` and refresh the page. You will see that the mobile number to `+91 99999 99999`, even though you never made these changes yourself.
