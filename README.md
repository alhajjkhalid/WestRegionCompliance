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

### CRITICAL: Root Directory Configuration Required

Since the dashboard is in a subfolder, you **MUST** configure Vercel to use the `dashboard` directory as the root. Without this, the deployment will fail.

### Method 1: Configure During Import (Recommended)

1. Go to [Vercel](https://vercel.com) and click **Add New Project**
2. Import your GitHub repository: `alhajjkhalid/SW-Compliance`
3. **IMPORTANT:** Before clicking Deploy, click **Edit** next to "Root Directory"
4. Select `dashboard` from the dropdown or type it manually
5. Vercel will automatically detect Next.js settings
6. Click **Deploy**

### Method 2: Update Existing Project

If you already created the project:

1. Go to your Vercel project dashboard
2. Click **Settings**
3. Navigate to **General** settings
4. Scroll down to find **Root Directory**
5. Click **Edit**
6. Enter: `dashboard`
7. Click **Save**
8. Go to **Deployments** tab
9. Click the three dots menu on the latest deployment
10. Click **Redeploy**

### Verifying Deployment

After deployment, your dashboard should be accessible at your Vercel URL. The API endpoint at `/api/data` should return the CSV data.

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
