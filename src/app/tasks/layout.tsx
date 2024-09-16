export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full py-10 px-4 bg-white">{children}</div>;
}
