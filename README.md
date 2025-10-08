# Nithish Saravanan - Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://nithishsaravananrss.github.io/NithishSaravananRss.github.io/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A modern, interactive portfolio website featuring a stunning blue-purple gradient theme, 3D animated particle background, and seamless dark mode design.

## ✨ Features

- 🎨 **Beautiful Blue-Purple Gradient Theme** - Eye-catching color scheme that's professional yet creative
- 🌌 **3D Animated Background** - Interactive particle field with mouse interaction
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🌙 **Dark Mode Optimized** - Designed specifically for dark mode aesthetics
- ✉️ **Working Contact Form** - Integrated with EmailJS for real email functionality
- 🚀 **Fast Performance** - Built with Vite for lightning-fast load times
- 🎭 **Smooth Animations** - Engaging scroll animations and transitions
- 💼 **Project Showcase** - Filterable project gallery with live demos

## 🛠️ Tech Stack

- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.7** - Next-generation frontend tooling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **EmailJS** - Email service for contact form
- **HTML5 Canvas** - For 3D particle animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NithishSaravananRss/NithishSaravananRss.github.io.git

# Navigate to project directory
cd NithishSaravananRss.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📧 EmailJS Setup

To enable the contact form:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a new email service
3. Create an email template
4. Update the credentials in `src/components/Contact.jsx`:
   - `SERVICE_ID`
   - `TEMPLATE_ID`
   - `PUBLIC_KEY`

See `EMAILJS_SETUP_GUIDE.md` for detailed instructions.

## 📂 Project Structure

```
portfolio/
├── public/           # Static assets
├── src/
│   ├── assets/      # Images and icons
│   ├── components/  # React components
│   │   ├── About.jsx
│   │   ├── AnimatedBackground.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.jsx      # Main app component
│   ├── index.css    # Global styles
│   └── main.jsx     # Entry point
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## 🎨 Customization

### Colors
The color scheme uses a blue-purple gradient. To customize, update the gradient classes in components:
- `from-blue-400 via-indigo-500 to-purple-600` for headings
- `from-blue-500 via-indigo-500 to-purple-500` for buttons

### Content
Update personal information in:
- `src/components/Hero.jsx` - Name and introduction
- `src/components/About.jsx` - Education and interests
- `src/components/Skills.jsx` - Technical skills
- `src/components/Projects.jsx` - Project portfolio
- `src/components/Contact.jsx` - Contact information

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Nithish Saravanan**
- GitHub: [@NithishSaravananRss](https://github.com/NithishSaravananRss)
- LinkedIn: [Nithish Saravanan](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Font: [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts
- Icons: Custom SVG icons
- Animations: CSS animations and Canvas API

---

⭐️ If you like this portfolio, give it a star on GitHub!

