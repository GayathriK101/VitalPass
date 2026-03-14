import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "VitalPass - Smart Emergency Medical Identity",
  description: "Your Emergency Medical Identity System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
