# Cash Flow App

Cash Flow App is a web application built with Next.js and Firebase that helps users track their income and expenses. It
provides an easy-to-use interface for adding cash flow entries and viewing financial history.

## Features

- Add cash flow entries with title, amount, type (income/expense), and date
- View cash flow entries in a paginated table
- Responsive design for desktop and mobile devices
- Firebase integration for data storage

## Technologies Used

- Next.js 14 (App Router)
- Firebase (Firestore)
- shadcn/ui components
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn
- Firebase account and project

### Installation

1. Clone the repository:

```
git clone https://github.com/wachidamirul/cash-flow-app.git
cd cash-flow-app
```

2. Install dependencies: `npm install` or `yarn install`

3. Set up your Firebase configuration:

   - Create a new Firebase project at https://console.firebase.google.com/
   - Enable Firestore in your project
   - Create a web app in your Firebase project to get the configuration object

4. Set up environment variables:

   - Copy a `.env.example` to `.env.local` file in the root directory
   - Add your Firebase configuration:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. Run the development server: `npm run dev ` or `yarn dev`

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Add a new cash flow entry:

   - Click on the "Add Cash Flow" button
   - Fill in the form with the entry details (title, amount, type, date)
   - Click "Submit" to save the entry

2. View cash flow entries:
   - Scroll through the table to see your entries
   - Use the "Load More" button at the bottom of the table to load additional entries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
