# 📷 WlidLens Tour Site Frontend

## 🚀 Overview

This repository contains the frontend of a functional WildLens Tour booking platform. The application is designed with a focus on providing a smooth and intuitive user experience. Built with React.js, it features a responsive design, interactive components, and an elegant UI.

**NETLIFY-URL** --> https://unique-sorbet-9172d3.netlify.app

## 🧰 Tech Stack

- **React.js** ⚛️: JavaScript library for building user interfaces.
- **HTML5** 📝: Markup language for structuring web content.
- **CSS3** 🎨: Styling for the application, ensuring responsive design.
- **JavaScript** 💻: Adds interactivity and logic to the frontend.

## 🖼️ Key Conditions

- **Bookings** 🧾: 

1. User cannot able to view booking before booking is done. 
2. User cannot able to book tours to past date.

- **How Edit Review works** ✏️:

  1.  Click on the Rating ⭐ icon from 1 t0 5 and then type the comments and then click submit to ADD the Comments.
  2.  Click on the Rating ⭐ icon from 1 to 5 and then type the comments and then click on the edit icon which is shown in the comments to EDIT the comment.
  3.  Click on the DELETE icon to delete the comments.

- **RazorPay** 💵:

 1. RazorPay integrated as test-mode, somethimes when user pay via UPI number, payments will get not success, try use different pay options within the RazorPay.

- **Body Background Image** : 

1. Sometimes user might face the blank white space while login/signup its because of the body background image is not loaded. 2. This might happen because user not using the latest version of browser.

## 🌐 Responsive Design

- **Mobile-First Approach** 📲: 

The application is designed to function smoothly on small screens, ensuring a good user experience on mobile devices.

- **Flexible Layouts** 🖥️:

 The design adapts to different screen sizes, providing a consistent experience across all devices.

## 🧪 How to Run the Frontend

1. **Install Dependencies** 📦

   ```bash
   npm install react-router-dom
   npm install axios
   npm install jwt-decode
   npm install react-bootstrap
   npm install react-toastify
   npm install formik
   npm install yup
   npm install react-dotenv
   npm install react-icons
   npm install react-responsive-masonry
   npm install react-slick
   npm install slick-carousel
   npm install react-spinners
   npm install moment
   npm install react-scroll
   npm install react-router-hash-link  
   ```

2. **Adding Script Tag for RazorPay inside index.html <head/> tag**

```bash
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

3. **Run the Server** ▶️
   ```bash
   npm run dev
   ```

4. **Build for Production** 🏗️
   ```bash
   npm run build
   ```
