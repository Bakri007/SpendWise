
# 💰 SpendWise — Personal Finance Manager

A full-stack personal finance web application built with the **MEAN Stack** that helps users track their income, expenses, and budgets in one place.

![SpendWise Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Angular](https://img.shields.io/badge/Angular-19-red)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

## ✨ Features

* 🔐 **Authentication** — Register, Login, Logout with JWT
* 📧 **Password Reset** — OTP-based password recovery via Email
* 💸 **Expense Tracking** — Add, edit, delete expenses with payment method categorization
* 💰 **Income Management** — Track multiple income sources (Salary, Freelance, Investment)
* 📊 **Dashboard** — Visual charts for income vs expenses and spending breakdown
* 🎯 **Budget Planning** — Set monthly budgets with real-time progress tracking
* 🗂️ **Custom Categories** — Create categories with custom icons and colors
* 🌍 **Multi-Currency** — Support for EGP, USD, EUR, GBP, SAR
* 📱 **Responsive Design** — Works on Mobile, Tablet and Desktop
* 🌙 **Dark Theme** — Modern dark UI with animated mascot
* 🛡️ **Admin Panel** — Manage all users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 19 + SCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| Charts | Chart.js |
| Icons | Tabler Icons |

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* Angular CLI
* MongoDB Atlas account

### Backend Setup

```bash
# Navigate to backend
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your environment variables

# Start the server
node index.js
```

### Frontend Setup

```bash
# Navigate to frontend
cd Frontend/spendwise

# Install dependencies
npm install

# Start the app
ng serve
```

Open your browser at `http://localhost:4200`

---

## ⚙️ Environment Variables

Create a `.env` file in the Backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## 📁 Project Structure

SpendWise/
├── Backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js
└── Frontend/
└── spendwise/
└── src/
└── app/
├── core/
├── pages/
└── shared/


---

## 📸 Screenshots
<img width="1907" height="1032" alt="image" src="https://github.com/user-attachments/assets/b7f10b5e-e9fc-4193-ae4d-a489a2ed60ed" />
<img width="1895" height="1016" alt="image" src="https://github.com/user-attachments/assets/c6d339b6-8519-42b0-a60b-b0fe0cbbb47f" />
<img width="1884" height="1038" alt="image" src="https://github.com/user-attachments/assets/def72246-0927-4c3e-af14-2e750072fe8e" />
<img width="1890" height="1026" alt="image" src="https://github.com/user-attachments/assets/aa74ce69-3c25-4747-906a-33f2f852dd66" />
<img width="1909" height="1024" alt="image" src="https://github.com/user-attachments/assets/1d489b76-5413-4593-8b0e-0891f6a2c635" />
<img width="1896" height="1020" alt="image" src="https://github.com/user-attachments/assets/d29dc00e-432e-4e83-a414-cf10cd7d11a8" />
<img width="1912" height="1036" alt="image" src="https://github.com/user-attachments/assets/8735949a-2ef0-453b-872a-d65ea9ebb7f1" />

---

## 👤 Author

**Mohamed Atef**
* LinkedIn: [Mohamed Atef](https://www.linkedin.com/in/mohammed-atef-656416355/)
* GitHub: [Bakri007](https://github.com/Bakri007)
---

## 📄 License

This project is open source and available under the MIT License
