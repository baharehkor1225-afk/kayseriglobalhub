# Deploy Checklist

## Before Deploy

- [ ] Rotate any Supabase or database secrets that were shared outside your team.
- [ ] Set the Vercel environment variables (see `DEPLOYMENT_ENV.md`):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `ADMIN_SECRET`
- [ ] Confirm backend Prisma variables are set in your backend host or locally: `DATABASE_URL`, `DIRECT_URL`.
- [ ] Test the admin login locally with the configured username and password.

## Build Validation

- [ ] Run `npm run vercel-build` from the repository root and confirm it succeeds.
- [ ] Confirm the build output includes:
  - `/admin`
  - `/admin/login`
  - `/admin/products/new`
  - `/admin/products/[id]/edit`
  - All `/api/admin/*` route handlers

## After Deploy

- [ ] Open `/admin/login` on the deployed URL and sign in.
- [ ] Create a new product from the admin panel.
- [ ] Edit an existing product and confirm the change saves.
- [ ] Click **Import Default Products** and confirm all 8 products appear in Supabase.
- [ ] Delete a test product and confirm it is removed from the list.
- [ ] Verify the public `/products` page shows the imported products.

## Security Checks

- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` is **not** set as a `NEXT_PUBLIC_*` variable.
- [ ] Confirm `ADMIN_SECRET` and `ADMIN_PASSWORD` are different values.
- [ ] Use different credentials for Production vs Preview environments.
- [ ] The admin panel is protected — attempting to visit `/admin` without a session should redirect to `/admin/login`.
