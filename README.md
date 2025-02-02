# Employee Management System

## Live Demo
[View Live Site](https://employee-management-38c38.web.app/)

## Overview
The Employee Management System is a web-based platform designed to help companies manage employee records, monitor workload, process payments, and track workflow updates efficiently. The system features role-based authentication, dashboards for employees and HR executives, data visualization, and integration with payment processing services.

## Features
- **Role-Based Authentication** (Employee, HR, Admin)
- **Employee Dashboard** for workflow updates and reports
- **HR Dashboard** for salary payments and contract management
- **Admin Panel** for overall system control
- **Salary Payment Processing** using Stripe
- **Data Visualization** with Charts
- **Pagination & Sorting** for employee records
- **Responsive UI** with React & Tailwind CSS

## Technologies Used
### Frontend
- React.js
- React Router DOM
- Firebase Authentication
- React Hook Form
- React Helmet (SEO)
- React Query (Data fetching)
- Chart.js (Data visualization)
- SweetAlert2 (User notifications)
- Swiper & React-Slick (Carousels)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Stripe (Payment Integration)

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo-url.git
   cd employee-management-system
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Backend Setup:**
   - Navigate to the backend folder: `cd backend`
   - Install backend dependencies: `npm install`
   - Start the backend server: `npm run start`

## Dependencies
```json
{
  "@smastrom/react-rating": "^1.5.0",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "@tanstack/react-table": "^8.20.6",
  "axios": "^1.7.9",
  "chart.js": "^4.4.7",
  "date-fns": "^4.1.0",
  "firebase": "^11.2.0",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-chartjs-2": "^5.3.0",
  "react-collapse": "^5.1.1",
  "react-datepicker": "^7.6.0",
  "react-dom": "^18.3.1",
  "react-helmet": "^6.1.0",
  "react-helmet-async": "^2.0.5",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.4.0",
  "react-paginate": "^8.2.0",
  "react-query": "^3.39.3",
  "react-responsive-carousel": "^3.2.23",
  "react-router-dom": "^7.1.1",
  "react-slick": "^0.30.3",
  "slick-carousel": "^1.8.1",
  "sort-by": "^1.2.0",
  "stripe": "^17.5.0",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1"
}
```

## Backend Setup
Ensure you have Node.js installed.

1. **Create a `.env` file** and add:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

2. **Run the backend server:**
   ```sh
   node server.js
   ```

## Contribution
Feel free to fork this repository and submit pull requests for improvements!

## License
This project is licensed under the MIT License.

