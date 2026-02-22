/**
 * Dedicated layout for the Sanity Studio route.
 *
 * This intentionally bypasses the root layout so the Studio gets a clean
 * full-screen canvas — no portfolio fonts, dark background, or providers.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
