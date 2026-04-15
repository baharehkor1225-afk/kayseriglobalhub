## Required Environment Variables

### Frontend local: `frontend/.env.local`

Only these values are required by the current Next.js app:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gsiwrvodonzzxxyorcwg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SECRET=your-long-random-session-signing-secret
```

### Backend local: `backend/.env`

Only these values are required by Prisma in the current backend:

```env
DATABASE_URL=postgres://...
DIRECT_URL=postgres://...
```

## Vercel Variables

Add these variables in the Vercel project settings for Production, Preview, and Development as needed:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gsiwrvodonzzxxyorcwg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SECRET=your-long-random-session-signing-secret
```

## Notes

- `NEXT_PUBLIC_*` values are exposed to the browser. Only the anon key belongs there.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-side only. It is used in admin API routes.
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` are the admin login credentials.
- `ADMIN_SECRET` is only used to sign the admin session cookie — keep it separate from `ADMIN_PASSWORD`.
- The root build command expected by Vercel is `npm run vercel-build`.

## Security

The Supabase and database secrets were exposed in chat during setup. Rotate these values in Supabase before production use:

- Service role key
- Database password / connection strings
- Any additional secret keys that were pasted publicly