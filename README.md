# SW Compliance Dashboard

A Next.js dashboard application for visualizing and analyzing compliance data from the SW region.

## Features

- Real-time data visualization from CSV file
- Interactive filtering and data analysis
- Compliance metrics and KPIs
- Department-wise breakdown
- DoD compliance tracking

## Project Structure

```
.
├── dashboard/              # Next.js application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── SW Report for AI.csv  # Live data source
├── Driver Card/           # Driver compliance reports
├── Face Rec/             # Facial recognition reports
├── Pmm/                  # PMM partner reports
├── Sponsor/              # Sponsor rate reports
├── Vehicle Bound/        # Vehicle bounding reports
└── SW Report for AI.csv  # Data source (also in root)
```

## Local Development

1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Important: Root Directory Configuration

Since the dashboard is in a subfolder, you need to configure Vercel to use the `dashboard` directory as the root:

1. Go to your Vercel project settings
2. Navigate to **Settings** > **General**
3. Find the **Root Directory** setting
4. Set it to: `dashboard`
5. Click **Save**

### Deployment Steps

1. Import your GitHub repository to Vercel
2. Configure the root directory as described above
3. Deploy

Alternatively, you can configure this during the initial import:
- When importing the project, click on **Edit** next to Root Directory
- Enter `dashboard`
- Click **Continue** and deploy

## Updating Data

To update the dashboard data:

1. Update the `SW Report for AI.csv` file in the `dashboard/` directory
2. Commit and push the changes:
   ```bash
   git add dashboard/"SW Report for AI.csv"
   git commit -m "Update compliance data"
   git push
   ```
3. Vercel will automatically redeploy with the new data

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **CSV Parsing:** PapaParse

## Data Source

The dashboard reads live data from `SW Report for AI.csv` which contains compliance information including:
- Department details
- DoD compliance status
- Cheating incidents
- Driver card compliance
- Facial recognition data
- Vehicle bounding information

## License

Private repository - All rights reserved
