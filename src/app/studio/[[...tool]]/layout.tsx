/**
 * Layout for the Sanity Studio route at /studio.
 * Renders only children; root layout provides the document shell.
 * NextStudio handles its own full-screen styling.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
