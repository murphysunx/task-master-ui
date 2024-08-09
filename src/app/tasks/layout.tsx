export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-grow p-10 bg-white">{children}</div>
  );
}
