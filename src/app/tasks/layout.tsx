export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full p-10 bg-white">{children}</div>;
}
